import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { TranslationService } from '../../translation/translation.service';
import { CacheService } from '../../cache/cache.service';
import { CartsService } from '../carts/carts.service';

import { CategoryType } from '../../types/category.types';
import { ProductType } from '../../types/product.types';

import lang from '../../resources/lang';
import Category from '../../interfaces/category';
import getTranslation from '../../functions/getTranslation';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryType>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductType>,
    private readonly redisService: CacheService,
    private readonly cartsService: CartsService,
    private readonly translationService: TranslationService,
    private readonly prisma: PrismaService,
  ) {}

  async getCategories(currentLang: string) {
    const categories = (await this.prisma.category.findMany({
      include: { translations: { select: { title: true, lang: true } } },
    })) as unknown as Category[];

    return categories.map((category) => {
      return {
        id: category.id,
        bannerImage: category.bannerImage,
        title: this.extractCategoryData(category, currentLang),
      };
    }) as Category[];
  }

  private extractCategoryData(category: Category, lang: string) {
    const categoryTranslation = getTranslation(category.translations, lang);

    return categoryTranslation?.title || category.translations[0].title;
  }

  async getCategory(categoryName: string, currentLang: string) {
    const category = await this.translationService.getCategoryTranslation(
      currentLang,
      categoryName,
    );

    return category;
  }

  async createCategory(name: string, bannerImg: string, currentLang: string) {
    const doesCategoryExists =
      (await this.categoryModel.findOne({ name })) !== null;

    if (doesCategoryExists) {
      return new HttpException(
        lang[currentLang].controllers.category.nameAlreadyExists,
        500,
      );
    }

    const createdCategory = await this.createNewCategory(
      name,
      bannerImg,
      currentLang,
    );
    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryCreated,
      category: createdCategory,
    };
  }

  async updateCategory(
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    name: string,
    bannerImage: string,
    currentLang: string,
  ) {
    await this.updateProvidedCategory(
      currentCategory,
      name,
      bannerImage,
      currentLang,
    );
    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryUpdated,
    };
  }

  async deleteCategory(
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    currentLang: string,
  ) {
    const productsInProvidedCategory = await this.productModel.find({
      category: currentCategory.name,
    });

    if (productsInProvidedCategory !== null) {
      productsInProvidedCategory.forEach(async (product) => {
        await this.cartsService.deleteProductFromAllCarts(product.id);
      });
    }

    await this.productModel.deleteMany({ category: currentCategory.name });
    await this.categoryModel.deleteOne({ _id: currentCategory._id });
    await this.redisService.flushCache();

    return {
      msg: `${lang[currentLang].global.category} ${lang[
        currentLang
      ].global.deleted.toLowerCase()}.`,
    };
  }

  private async createNewCategory(
    name: string,
    bannerImage: string,
    currentLang: string,
  ) {
    const newCategory = new this.categoryModel({
      name,
      bannerImage,
      categoryURL: name,
      translations: [],
    });

    if (currentLang !== 'en') {
      newCategory.translations.push({
        lang: currentLang,
        name,
      });
    }

    const createdCategory = await newCategory.save();

    return createdCategory;
  }

  private async updateProvidedCategory(
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    name: string,
    bannerImage: string,
    currentLang: string,
  ) {
    const doesTranslationExistOnCategory =
      currentCategory.translations.find(
        (translation) => translation.lang === currentLang,
      ) !== undefined;

    if (currentLang !== 'en') {
      // Update non english category
      if (doesTranslationExistOnCategory) {
        currentCategory.translations = currentCategory.translations.map(
          (translation) => {
            const returnValue = { ...translation };

            if (translation.lang === currentLang) {
              translation.name = name === undefined ? translation.name : name;
            }

            return returnValue;
          },
        );
      } else {
        currentCategory.translations.push({
          lang: currentLang,
          name: name === undefined ? currentCategory.name : name,
        });
      }
    } else {
      // Update english category
      await this.updateCategoryOfProducts(currentCategory.name, name);

      currentCategory.name = name === undefined ? currentCategory.name : name;
    }

    currentCategory.bannerImage =
      bannerImage === undefined ? currentCategory.bannerImage : bannerImage;

    await currentCategory.save();
  }

  private updateCategoryOfProducts = async (
    oldCategoryName: string,
    newCategoryName: string,
  ) => {
    await this.productModel.updateMany(
      { category: oldCategoryName },
      {
        category: newCategoryName,
      },
    );
  };

  public async deleteEmptyCategory(categoryName: string) {
    const isCategoryEmpty =
      (await (
        await this.productModel.find({ category: categoryName })
      ).length) <= 1;

    // Current product is the only one in the category
    if (isCategoryEmpty) {
      await this.categoryModel.deleteOne({ name: categoryName });
    }
  }
}

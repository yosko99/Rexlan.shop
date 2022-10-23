import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { RedisService } from '../cache/redis.service';
import { TranslationService } from '../translation/translation.service';

import { CategoryType } from '../types/category.types';
import { ProductType } from '../types/product.types';

import lang from '../resources/lang';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryType>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductType>,
    private readonly redisService: RedisService,
    private readonly translationService: TranslationService,
  ) {}

  async getCategories(currentLang: string) {
    const categories = await this.categoryModel.find({});

    const translatedCategories =
      await this.translationService.getCategoriesTranslation(
        currentLang,
        categories,
      );

    return translatedCategories;
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

    await this.createNewCategory(name, bannerImg, currentLang);
    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryCreated,
    };
  }

  async upateCategory(
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

  async deleteCategory() {}

  private createNewCategory = async (
    name: string,
    bannerImage: string,
    currentLang: string,
  ) => {
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

    await newCategory.save();
  };

  private updateProvidedCategory = async (
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    name: string,
    bannerImage: string,
    currentLang: string,
  ) => {
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
      currentCategory.bannerImage =
        bannerImage === undefined ? currentCategory.bannerImage : bannerImage;
    }

    await currentCategory.save();
  };

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
}

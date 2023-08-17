import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CacheService } from '../../cache/cache.service';
import { CartsService } from '../carts/carts.service';

import lang from '../../resources/lang';
import Category from '../../interfaces/category';
import getTranslation from '../../functions/getTranslation';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly redisService: CacheService,
    private readonly cartsService: CartsService,
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

  private extractCategoryData(category: Category, lang: string): string {
    const categoryTranslation = getTranslation(category.translations, lang);

    return categoryTranslation?.title || category.translations[0].title;
  }

  async getCategory(categoryId: string, currentLang: string) {
    const category = await this.retrieveCategory(categoryId, currentLang);

    return {
      title: this.extractCategoryData(category, currentLang),
      bannerImage: category.bannerImage,
      id: category.id,
    };
  }

  private async retrieveCategory(categoryId: string, currentLang: string) {
    const category = (await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        translations: true,
      },
    })) as unknown as Category;

    if (category === null) {
      throw new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    return category;
  }

  async createCategory(
    title: string,
    bannerImage: string,
    currentLang: string,
  ) {
    const doesCategoryExists =
      (await this.prisma.category.findFirst({
        where: { translations: { some: { title } } },
      })) !== null;

    if (doesCategoryExists) {
      throw new HttpException(
        lang[currentLang].controllers.category.nameAlreadyExists,
        409,
      );
    }

    const newCategory = await this.prisma.category.create({
      data: {
        bannerImage,
        translations: {
          create: {
            lang: currentLang,
            title,
          },
        },
      },
    });

    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryCreated,
      category: newCategory,
    };
  }

  async updateCategory(
    categoryId: string,
    title: string,
    bannerImage: string,
    currentLang: string,
  ) {
    const category = await this.retrieveCategory(categoryId, currentLang);

    const categoryTranslationIndex = category.translations.findIndex(
      (translation) => translation.lang === currentLang,
    );

    if (categoryTranslationIndex === -1) {
      await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          bannerImage: bannerImage || category.bannerImage,
          translations: {
            create: {
              lang: currentLang,
              title: title,
            },
          },
        },
      });
    } else {
      await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          bannerImage: bannerImage || category.bannerImage,
          translations: {
            update: {
              where: { id: category.translations[categoryTranslationIndex].id },
              data: {
                title: title || category.title,
              },
            },
          },
        },
      });
    }

    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryUpdated,
    };
  }

  async deleteCategory(categoryId: string, currentLang: string) {
    await this.retrieveCategory(categoryId, currentLang);
    await this.cartsService.deleteCategoryProductsFromCarts(categoryId);
    await this.prisma.$transaction([
      this.prisma.product.deleteMany({ where: { categoryId } }),
      this.prisma.category.delete({ where: { id: categoryId } }),
    ]);

    await this.redisService.flushCache();

    return {
      msg: `${lang[currentLang].global.category} ${lang[
        currentLang
      ].global.deleted.toLowerCase()}.`,
    };
  }
}

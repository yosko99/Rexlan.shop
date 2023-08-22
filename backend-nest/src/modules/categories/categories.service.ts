import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CacheService } from '../cache/cache.service';
import { CartsService } from '../carts/carts.service';

import lang from '../../resources/lang';
import { Category } from '../../interfaces/category';
import getTranslation from '../../functions/getTranslation';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/category.dto';
import { Token } from 'src/interfaces/token';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly cartsService: CartsService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
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
    const category = await this.retrieveCategoryById(categoryId, currentLang);

    return {
      title: this.extractCategoryData(category, currentLang),
      bannerImage: category.bannerImage,
      id: category.id,
    };
  }

  private async retrieveCategoryById(categoryId: string, currentLang: string) {
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
    { title, bannerImage }: CreateCategoryDto,
    { email }: Token,
    currentLang: string,
  ) {
    const user = await this.userService.retrieveUserByEmail(email);
    await this.userService.isAdmin(user);

    await this.doesCategoryNameExist(title, currentLang);

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

    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryCreated,
      category: newCategory,
    };
  }

  private async doesCategoryNameExist(title: string, currentLang: string) {
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
  }

  async updateCategory(
    categoryId: string,
    { bannerImage, title }: UpdateCategoryDto,
    { email }: Token,
    currentLang: string,
  ) {
    const user = await this.userService.retrieveUserByEmail(email);
    await this.userService.isAdmin(user);

    const category = await this.retrieveCategoryById(categoryId, currentLang);
    await this.doesCategoryNameExist(title, currentLang);

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

    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.category.categoryUpdated,
    };
  }

  async deleteCategory(
    categoryId: string,
    { email }: Token,
    currentLang: string,
  ) {
    const user = await this.userService.retrieveUserByEmail(email);
    await this.userService.isAdmin(user);

    await this.retrieveCategoryById(categoryId, currentLang);
    await this.cartsService.deleteCategoryProductsFromCarts(categoryId);
    await this.prisma.$transaction([
      this.prisma.product.deleteMany({ where: { categoryId } }),
      this.prisma.category.delete({ where: { id: categoryId } }),
    ]);

    await this.cacheService.flushCache();

    return {
      msg: `${lang[currentLang].global.category} ${lang[
        currentLang
      ].global.deleted.toLowerCase()}.`,
    };
  }
}

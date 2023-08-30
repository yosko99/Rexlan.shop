import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CacheService } from '../cache/cache.service';
import { CartService } from '../cart/cart.service';

import lang from '../../resources/lang';
import { Category } from '../../interfaces/category';
import getTranslation from '../../functions/getTranslation';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/category.dto';
import { Token } from 'src/interfaces/token';
import deleteImage from '../../functions/deleteImage';

@Injectable()
export class CategoryService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly cartService: CartService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getCategories(currentLang: string) {
    const categories = (await this.prisma.category.findMany({
      include: {
        translations: {
          select: {
            title: true,
            lang: true,
          },
        },
      },
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
    { title }: CreateCategoryDto,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    await this.doesCategoryNameExist(title, currentLang, filename);

    const newCategory = await this.prisma.category.create({
      data: {
        bannerImage: filename,
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

  private async doesCategoryNameExist(
    title: string,
    currentLang: string,
    bannerImage?: string,
  ) {
    const doesCategoryExists =
      (await this.prisma.category.findFirst({
        where: { translations: { some: { title } } },
      })) !== null;

    if (doesCategoryExists) {
      await deleteImage(bannerImage);
      throw new HttpException(
        lang[currentLang].controllers.category.nameAlreadyExists,
        409,
      );
    }
  }

  async updateCategory(
    categoryId: string,
    { title }: UpdateCategoryDto,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    const category = await this.retrieveCategoryById(categoryId, currentLang);

    const doesTitleExistOnCurrentCategory = category.translations.find(
      (translation) => translation.title === title,
    );

    if (doesTitleExistOnCurrentCategory === undefined && title !== undefined) {
      await this.doesCategoryNameExist(title, currentLang, filename);
    }
    await deleteImage(category.bannerImage);

    const categoryTranslationIndex = category.translations.findIndex(
      (translation) => translation.lang === currentLang,
    );

    // Add new category translation
    if (categoryTranslationIndex === -1) {
      await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          bannerImage: filename,
          translations: {
            create: {
              lang: currentLang,
              title: title,
            },
          },
        },
      });
    } else {
      // Update category translation
      await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          bannerImage: filename,
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
    await this.userService.isAdmin(email);
    const category = await this.retrieveCategoryById(categoryId, currentLang);
    await deleteImage(category.bannerImage);
    await this.cartService.deleteCategoryProductsFromCarts(categoryId);
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

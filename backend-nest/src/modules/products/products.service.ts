/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CacheService } from '../../cache/cache.service';

import { productSortingType } from '../../types/product.types';

import lang from '../../resources/lang';
import { PrismaService } from '../prisma/prisma.service';
import { getProductIncludeQuery } from '../prisma/queries/product.queries';
import { Product } from '../../interfaces/product';
import getTranslation from '../../functions/getTranslation';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prisma: PrismaService,
  ) {}

  async getProducts(qty: string, currentLang: string) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `products-qty${productQuantity}-lang${currentLang}`;

    const products = (await this.prisma.product.findMany({
      take: productQuantity,
      include: getProductIncludeQuery(),
    })) as unknown as Product[];

    return this.getCachedProducts(products, cacheKey, currentLang);
  }

  async getProduct(productId: string, currentLang: string) {
    const cacheKey = `product-${productId}-lang${currentLang}`;

    const product = (await this.prisma.product.findUnique({
      where: { id: productId },
      include: getProductIncludeQuery(),
    })) as unknown as Product;

    if (product === null) {
      return new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    return this.cacheService.setAndGetData(cacheKey, () =>
      this.extractProductData(product, currentLang),
    );
  }

  extractProductData(product: Product, lang: string): Product {
    const productTranslation = getTranslation(product.translations, lang);
    const categoryTranslation = getTranslation(
      product.category.translations,
      lang,
    );

    return {
      id: product.id,
      price: product.price,
      image: product.image,
      rating: product.rating,
      category:
        categoryTranslation?.title || product.category.translations[0].title,
      title: productTranslation?.title || product.translations[0].title,
      description:
        productTranslation?.description || product.translations[0].description,
    };
  }

  async getProductsByCategory(
    qty: string,
    categoryName: string,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${categoryName}-qty${productQuantity}-lang${currentLang}`;

    const products = (await this.prisma.product.findMany({
      take: productQuantity,
      include: getProductIncludeQuery(),
      where: {
        category: {
          translations: {
            some: { title: categoryName },
          },
        },
      },
    })) as unknown as Product[];

    if (products === null || products.length === 0) {
      return new NotFoundException(
        lang[currentLang].global.noDataWithProvidedCategory,
      );
    }

    return this.getCachedProducts(products, cacheKey, currentLang);
  }

  async getProductsSortedByAttribute(
    qty: string,
    productAttribute: productSortingType,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${productAttribute}-qty${productQuantity}-lang${currentLang}`;

    try {
      const products = (await this.prisma.product.findMany({
        take: productQuantity,
        include: getProductIncludeQuery(),
        orderBy: { [productAttribute]: 'desc' },
      })) as unknown as Product[];

      if (products === null || products.length === 0) {
        return new NotFoundException(lang[currentLang].global.couldNotFindData);
      }

      return this.getCachedProducts(products, cacheKey, currentLang);
    } catch (_error) {
      throw new HttpException(lang[currentLang].global.couldNotFindData, 422);
    }
  }

  async getProductsByQueryString(pattern: string, currentLang: string) {
    const cacheKey = `${pattern}-lang${currentLang}`;

    const products = (await this.prisma.product.findMany({
      where: {
        translations: {
          some: {
            title: {
              contains: pattern,
              mode: 'insensitive',
            },
          },
        },
      },
      take: 4,
      include: getProductIncludeQuery(),
    })) as unknown as Product[];

    return this.getCachedProducts(products, cacheKey, currentLang);
  }

  async createProduct(
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    const selectedCategory = await this.prisma.category.findFirst({
      where: { translations: { some: { title: category } } },
    });

    if (selectedCategory === null) {
      throw new HttpException(
        'Category with provided name does not exists',
        404,
      );
    }

    const newProduct = await this.prisma.product.create({
      data: {
        rating: { create: { count: 0, rate: 0 } },
        price: price === undefined ? 0 : Number(price),
        category: { connect: { id: selectedCategory.id } },
        image,
        translations: {
          create: { lang: currentLang, title, description },
        },
      },
    });

    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.product.productCreated,
      product: newProduct,
    };
  }

  async deleteProduct(productId: string, currentLang: string) {
    await this.retrieveProduct(productId, currentLang);
    await this.prisma.product.delete({ where: { id: productId } });
    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].global.dataDeleted,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    const product = await this.retrieveProduct(productId, currentLang);

    const productTranslationIndex = product.translations.findIndex(
      (translation) => translation.lang === currentLang,
    );

    const selectedCategory = await this.prisma.category.findFirst({
      where: { translations: { some: { title: category } } },
    });

    // Does not exist translation
    if (productTranslationIndex === -1) {
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          price: Number(price) || product.price,
          image: image || product.image,
          translations: {
            create: {
              title: title || product.title,
              description: description || product.description,
              lang: currentLang,
            },
          },
          category: { connect: { id: selectedCategory.id } },
        },
      });
    } else {
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          price: Number(price) || product.price,
          image: image || product.image,
          category: { connect: { id: selectedCategory.id } },
          translations: {
            update: {
              where: { id: product.translations[productTranslationIndex].id },
              data: {
                title: title || product.title,
                description: description || product.description,
              },
            },
          },
        },
      });
    }

    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.product.productUpdated,
    };
  }

  async retrieveProduct(productId: string, currentLang: string) {
    const product = (await this.prisma.product.findUnique({
      where: { id: productId },
      include: getProductIncludeQuery(),
    })) as unknown as Product;

    if (product === null) {
      throw new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    return product;
  }

  private async getCachedProducts(
    products: Product[],
    cacheKey: string,
    lang: string,
  ) {
    return this.cacheService.setAndGetData(cacheKey, () =>
      products.map((product) => {
        return this.extractProductData(product as unknown as Product, lang);
      }),
    );
  }

  private getQueryQty(queryQty: string) {
    const queryQuantity = queryQty;

    const quantity =
      queryQuantity !== undefined ? queryQuantity : Number.MAX_SAFE_INTEGER;

    return Number(quantity);
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CacheService } from '../cache/cache.service';

import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { getProductIncludeQuery } from '../../prisma/queries/product.queries';
import { Product, ProductSortAttributes } from '../../interfaces/product';
import { CreateProductDto, UpdateProductDto } from '../../dto/product.dto';
import { UserService } from '../user/user.service';
import { Token } from '../../interfaces/token';
import extractProductData from '../../functions/extractProductData';
import deleteImage from '../../functions/deleteImage';

@Injectable()
export class ProductService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
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

  private async getMostViewedProducts(qty: number, currentLang: string) {
    const topViewedProducts = await this.prisma.productView.findMany({
      take: qty,
      orderBy: {
        count: 'desc',
      },
      include: {
        product: {
          include: getProductIncludeQuery(),
        },
      },
    });

    return topViewedProducts.map((product) => {
      return extractProductData(
        product.product as unknown as Product,
        currentLang,
      );
    });
  }

  async getProduct(productId: string, currentLang: string) {
    const cacheKey = `product-${productId}-lang${currentLang}`;

    const product = await this.retrieveProduct(productId, currentLang);
    await this.updateProductViews(productId);

    return this.cacheService.setAndGetData(cacheKey, () =>
      extractProductData(product, currentLang),
    );
  }

  private async updateProductViews(productId: string) {
    await this.prisma.productView.upsert({
      create: {
        product: { connect: { id: productId } },
      },
      update: {
        count: { increment: 1 },
      },
      where: { productId },
    });
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
    productAttribute: ProductSortAttributes,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);

    if (productAttribute === 'mostViewed') {
      return this.getMostViewedProducts(productQuantity, currentLang);
    }

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

  private async doesCategoryExist(title: string) {
    const selectedCategory = await this.prisma.category.findFirst({
      where: { translations: { some: { title } } },
    });

    if (selectedCategory === null) {
      throw new HttpException(
        'Category with provided name does not exists',
        404,
      );
    }

    return selectedCategory;
  }

  async createProduct(
    { category, description, price, title }: CreateProductDto,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);

    const selectedCategory = await this.doesCategoryExist(category);
    const newProduct = await this.prisma.product.create({
      data: {
        rating: {
          create: {
            count: 0,
            rate: 0,
          },
        },
        price: price === undefined ? 0 : Number(price),
        category: { connect: { id: selectedCategory.id } },
        image: filename,
        translations: {
          create: {
            lang: currentLang,
            title,
            description,
          },
        },
      },
    });

    await this.cacheService.flushCache();

    return {
      msg: lang[currentLang].controllers.product.productCreated,
      product: newProduct,
    };
  }

  async deleteProduct(
    productId: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);

    const product = await this.retrieveProduct(productId, currentLang);
    await this.prisma.product.delete({ where: { id: productId } });
    await this.cacheService.flushCache();
    await deleteImage(product.image);

    return {
      msg: lang[currentLang].global.dataDeleted,
    };
  }

  async updateProduct(
    { category, description, price, title }: UpdateProductDto,
    productId: string,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);

    const product = await this.retrieveProduct(productId, currentLang);
    const selectedCategory = await this.doesCategoryExist(category);

    const productTranslationIndex = product.translations.findIndex(
      (translation) => translation.lang === currentLang,
    );

    await deleteImage(product.image);

    // Does not exist translation
    if (productTranslationIndex === -1) {
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          price: Number(price) || product.price,
          image: filename,
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
      // Update product translation
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          price: Number(price) || product.price,
          image: filename,
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
        return extractProductData(product as unknown as Product, lang);
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

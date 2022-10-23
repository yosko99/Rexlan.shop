import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from '../cache/redis.service';
import { TranslationService } from '../translation/translation.service';

import { productSortingType, ProductType } from '../types/product.types';

import lang from '../resources/lang';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
    private readonly translationService: TranslationService,
    private readonly redisService: RedisService,
  ) {}

  async getProducts(qty: string, currentLang: string) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `products-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel.find({}).limit(productQuantity);

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async getProduct(productID: string, currentLang: string) {
    const cacheKey = `product-${productID}-lang${currentLang}`;

    const product = await this.productModel
      .findOne({
        id: productID,
      })
      .select('-__v -_id');

    if (product === null) {
      return new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    const translatedProduct = await this.getTranslatedProduct(
      product,
      currentLang,
      cacheKey,
    );

    return translatedProduct;
  }

  async getProductsByCategory(
    qty: string,
    categoryName: string,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${categoryName}-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel
      .find({})
      .where('category')
      .equals(categoryName)
      .limit(productQuantity);

    if (products === null || products.length === 0) {
      return {
        products: [],
        msg: lang[currentLang].global.noDataWithProvidedCategory,
      };
    }

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );
    return translatedProducts;
  }

  async getProductsSortedByAttribute(
    qty: string,
    productAttribute: productSortingType,
    currentLang: string,
  ) {
    const productQuantity = this.getQueryQty(qty);
    const cacheKey = `${productAttribute}-qty${productQuantity}-lang${currentLang}`;

    const products = await this.productModel
      .find({})
      .sort({ [productAttribute]: -1 })
      .limit(productQuantity);

    if (products === null || products.length === 0) {
      return {
        products: [],
        msg: lang[currentLang].global.couldNotFindData,
      };
    }

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async getProductsByQueryString(pattern: RegExp, currentLang: string) {
    const cacheKey = `${pattern}-lang${currentLang}`;

    const products = await this.productModel
      .find({
        $or: [
          {
            title: {
              $regex: pattern,
              $options: 'si',
            },
          },
          {
            translations: {
              $elemMatch: {
                title: {
                  $regex: pattern,
                  $options: 'si',
                },
              },
            },
          },
        ],
      })
      .limit(4);

    const translatedProducts = await this.getTranslatedProducts(
      products,
      currentLang,
      cacheKey,
    );

    return translatedProducts;
  }

  async createProduct(
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    currentLang: string,
  ) {
    await this.addProduct(
      currentLang,
      title,
      price,
      description,
      category,
      image,
    );

    await this.redisService.flushCache();

    return {
      msg: lang[currentLang].controllers.product.productCreated,
    };
  }

  async deleteProduct(productID: string, currentLang: string) {}

  async updateProduct(
    productID: string,
    title,
    price,
    description,
    category,
    image,
    currentLang: string,
  ) {}

  private addProduct = async (
    currentLang: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
  ) => {
    const maxID = await this.getMaxProductID();

    const newProduct = {
      title,
      price: price === undefined ? 0 : price,
      description,
      category,
      image,
      categoryURL: category,
      id: maxID,
      translations: [],
    };

    if (currentLang !== 'en') {
      newProduct.translations.push({
        lang: currentLang,
        title,
        description,
      });
    }

    await this.productModel.create(newProduct);
  };

  private getMaxProductID = async () => {
    const allProductIDs = await this.productModel.find({}).select('id -_id');

    if (allProductIDs.length === 0) {
      return 1;
    }

    const { id } = allProductIDs.sort((a, b) => Number(b.id) - Number(a.id))[0];

    return Number(id) + 1;
  };

  private getTranslatedProducts = async (
    products: ProductType[],
    currentLang: string,
    cacheKey: string,
  ) => {
    return await this.redisService.setAndGetData(cacheKey, async () => {
      return await this.translationService.getProductsTranslation(
        currentLang,
        products,
      );
    });
  };

  private getTranslatedProduct = async (
    product: ProductType,
    currentLang: string,
    cacheKey: string,
  ) => {
    return await this.redisService.setAndGetData(cacheKey, async () => {
      return await this.translationService.getProductTranslation(
        currentLang,
        product,
      );
    });
  };

  private checkExistingProduct = async (productID: string) => {
    const product = await this.productModel.findOne({ id: productID });

    if (product === null) {
      return new NotFoundException('Cannot find product with provided id.');
    }

    return product;
  };

  private getQueryQty = (queryQty: string) => {
    const queryQuantity = queryQty;

    const quantity = queryQuantity !== undefined ? queryQuantity : 0;

    return Number(quantity);
  };
}

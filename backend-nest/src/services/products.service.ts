import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from 'src/cache/redis.service';
import { TranslationService } from 'src/translation/translation.service';

import getQueryQty from 'src/controllers/functions/utils/getQueryQty';

import { ProductType } from 'src/types/product.types';

import lang from '../resources/lang';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
    private readonly translationService: TranslationService,
    private readonly redisService: RedisService,
  ) {}

  async getProducts(qty: string, currentLang: string) {
    const productQuantity = getQueryQty(qty);
    const cacheKey = `products-qty${productQuantity}-lang${currentLang}`;

    const productsFromDB = await this.productModel
      .find({})
      .limit(productQuantity);

    const products = await this.redisService.setAndGetData(
      cacheKey,
      async () => {
        return await this.translationService.getProductsTranslation(
          currentLang,
          productsFromDB,
        );
      },
    );
    return products;
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

    const translatedProduct = await this.redisService.setAndGetData(
      cacheKey,
      async () => {
        return await this.translationService.getProductTranslation(
          currentLang,
          product,
        );
      },
    );

    return translatedProduct;
  }

  private async checkExistingProduct(productID: string) {
    const product = await this.productModel.findOne({ id: productID });

    if (product === null) {
      return new NotFoundException('Cannot find product with provided id.');
    }

    return product;
  }
}

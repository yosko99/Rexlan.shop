import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CategoryTranslationService } from '../category/categoryTranslation.service';

import { ProductType } from 'src/types/product.types';

@Injectable()
export class ProductTranslationService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
    private readonly categoryTranslationService: CategoryTranslationService,
  ) {}

  async getProductTranslation(currentLang: string, product: ProductType) {
    if (product === null) {
      return null;
    }

    const translatedCategory =
      await this.categoryTranslationService.getCategoryTranslation(
        currentLang,
        product.category,
      );
    const [translation] = product.translations.filter(
      (translation) => translation.lang === currentLang,
    );

    product.categoryURL = translatedCategory.categoryURL;

    if (translation !== undefined) {
      product.title = translation.title;
      product.description = translation.description;
      product.category = translatedCategory.name;
    }

    return product;
  }

  async getProductsTranslation(currentLang: string, products: ProductType[]) {
    const translatedProducts = await Promise.all(
      products.map(async (product) => {
        return await this.getProductTranslation(currentLang, product);
      }),
    );
    return translatedProducts;
  }
}

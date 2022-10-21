import { Injectable } from '@nestjs/common';

import { CategoryType } from 'src/types/category.types';
import { ProductType } from 'src/types/product.types';

import { CategoryTranslationService } from './category/categoryTranslation.service';
import { ProductTranslationService } from './product/productTranslation.service';

@Injectable()
export class TranslationService {
  constructor(
    private readonly productTranslationService: ProductTranslationService,
    private readonly categoryTranslationService: CategoryTranslationService,
  ) {}

  async getProductTranslation(currentLang: string, product: ProductType) {
    return this.productTranslationService.getProductTranslation(
      currentLang,
      product,
    );
  }
  async getProductsTranslation(currentLang: string, products: ProductType[]) {
    return this.productTranslationService.getProductsTranslation(
      currentLang,
      products,
    );
  }

  async getCategoryTranslation(currentLang: string, categoryName: string) {
    return this.categoryTranslationService.getCategoryTranslation(
      currentLang,
      categoryName,
    );
  }

  async getCategoriesTranslation(
    currentLang: string,
    categories: CategoryType[],
  ) {
    return this.categoryTranslationService.getCategoriesTranslation(
      currentLang,
      categories,
    );
  }
}

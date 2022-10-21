import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CategoryType } from 'src/types/category.types';

@Injectable()
export class CategoryTranslationService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryType>,
  ) {}

  async getCategoryTranslation(currentLang: string, categoryName: string) {
    const category = await this.categoryModel.findOne({
      name: categoryName,
    });

    category.categoryURL = category.name;

    const [translation] = category.translations.filter(
      (translation) => translation.lang === currentLang,
    );

    if (translation !== undefined) {
      category.name = translation.name;
    }

    return category;
  }

  async getCategoriesTranslation(
    currentLang: string,
    categories: CategoryType[],
  ) {
    const translatedCategories = await Promise.all(
      categories.map(async (category) => {
        return await this.getCategoryTranslation(currentLang, category.name);
      }),
    );
    return translatedCategories;
  }
}

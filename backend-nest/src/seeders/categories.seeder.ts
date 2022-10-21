import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

import * as categoryData from '../data/categories.json';
import { CategoryType } from 'src/types/category.types';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryType>,
  ) {}

  async seed(): Promise<any> {
    return this.categoryModel.insertMany(categoryData);
  }

  async drop(): Promise<any> {
    return this.categoryModel.deleteMany({});
  }
}

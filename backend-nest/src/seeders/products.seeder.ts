import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

import * as productData from '../data/products.json';
import { ProductType } from 'src/types/product.types';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
  ) {}

  async seed(): Promise<any> {
    return this.productModel.insertMany(productData);
  }

  async drop(): Promise<any> {
    return this.productModel.deleteMany({});
  }
}

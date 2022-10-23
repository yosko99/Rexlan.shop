import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { categorySchema } from '../../schemas/category.schema';
import { productSchema } from '../..//schemas/product.schema';

import { CategoryTranslationService } from '../category/categoryTranslation.service';
import { ProductTranslationService } from './productTranslation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  providers: [ProductTranslationService, CategoryTranslationService],
  exports: [ProductTranslationService],
})
export class ProductTranslationModule {}

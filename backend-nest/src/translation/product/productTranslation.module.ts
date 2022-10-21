import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { categorySchema } from 'src/schemas/category.schema';
import { productSchema } from 'src/schemas/product.schema';

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

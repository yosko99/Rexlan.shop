import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { categorySchema } from '../../schemas/category.schema';

import { CategoryTranslationService } from './categoryTranslation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  providers: [CategoryTranslationService],
  exports: [CategoryTranslationService],
})
export class CategoryTranslationModule {}

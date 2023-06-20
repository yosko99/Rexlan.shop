import { Module } from '@nestjs/common';

import { CategoryTranslationModule } from './category/categoryTranslation.module';
import { ProductTranslationModule } from './product/productTranslation.module';

import { TranslationService } from './translation.service';

@Module({
  imports: [ProductTranslationModule, CategoryTranslationModule],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}

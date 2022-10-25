import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TranslationModule } from '../translation/translation.module';
import { RedisCacheModule } from '../cache/redis.module';

import { CategoriesController } from '../controllers/categories.controller';

import { CategoriesService } from '../services/categories.service';

import { categorySchema } from '../schemas/category.schema';
import { productSchema } from '../schemas/product.schema';

import { CheckExistingCategoryMiddleware } from '../middleware/category/checkExistingCategory.middleware';

@Module({
  imports: [
    RedisCacheModule,
    TranslationModule,
    MongooseModule.forFeature([
      { name: 'Category', schema: categorySchema },
      { name: 'Product', schema: productSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistingCategoryMiddleware)
      .forRoutes('/categories/:_id');
  }
}

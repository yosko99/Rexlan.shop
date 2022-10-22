import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TranslationModule } from 'src/translation/translation.module';
import { RedisCacheModule } from 'src/cache/redis.module';

import { CategoriesController } from 'src/controllers/categories.controller';

import { CategoriesService } from 'src/services/categories.service';

import { categorySchema } from 'src/schemas/category.schema';
import { productSchema } from 'src/schemas/product.schema';

import { CheckExistingCategoryMiddleware } from 'src/middleware/category/checkExistingCategory.middleware';

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
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistingCategoryMiddleware)
      .forRoutes('/categories/:_id');
  }
}

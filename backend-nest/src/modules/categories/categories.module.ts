import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TranslationModule } from '../../translation/translation.module';
import { RedisCacheModule } from '../../cache/cache.module';
import { CartsModule } from '../carts/carts.module';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { categorySchema } from './schemas/category.schema';
import { productSchema } from '../products/schemas/product.schema';

import { CheckExistingCategoryMiddleware } from '../../middleware/category/checkExistingCategory.middleware';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    CartsModule,
    RedisCacheModule,
    TranslationModule,
    MongooseModule.forFeature([
      { name: 'Category', schema: categorySchema },
      { name: 'Product', schema: productSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckExistingCategoryMiddleware)
      .forRoutes('/categories/:_id');
  }
}

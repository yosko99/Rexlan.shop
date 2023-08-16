import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TranslationModule } from '../../translation/translation.module';
import { RedisCacheModule } from '../../cache/cache.module';
import { CategoriesModule } from '../categories/categories.module';
import { CartsModule } from '../carts/carts.module';

import { productSchema } from './schemas/product.schema';
import { categorySchema } from '../categories/schemas/category.schema';

import { ProductsController } from './products.controller';

import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    TranslationModule,
    RedisCacheModule,
    CategoriesModule,
    CartsModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckExistingProductMiddleware } from '../middleware/product/checkExistingProduct.middleware';

import { TranslationModule } from '../translation/translation.module';
import { RedisCacheModule } from '../cache/redis.module';
import { CategoriesModule } from './categories.module';
import { CartsModule } from './carts.module';

import { productSchema } from '../schemas/product.schema';

import { ProductsController } from '../controllers/products.controller';

import { ProductsService } from '../services/products.service';

@Module({
  imports: [
    TranslationModule,
    RedisCacheModule,
    CategoriesModule,
    CartsModule,
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingProductMiddleware).forRoutes(
      {
        path: '/products/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/products/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

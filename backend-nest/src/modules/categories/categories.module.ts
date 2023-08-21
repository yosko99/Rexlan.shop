import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, CartsService, ProductsService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { PrismaService } from '../../prisma/prisma.service';
import { CartsModule } from '../carts/carts.module';

@Module({
  imports: [CartsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

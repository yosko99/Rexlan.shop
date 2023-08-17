import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TranslationModule } from '../../translation/translation.module';
import { RedisCacheModule } from '../../cache/cache.module';
import { CartsModule } from '../carts/carts.module';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [CartsModule, RedisCacheModule, TranslationModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

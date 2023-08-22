import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { PrismaService } from '../../prisma/prisma.service';
import { CartsModule } from '../carts/carts.module';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CartsModule, UsersModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyJWTMiddleware)
      .forRoutes(
        { path: '/categories', method: RequestMethod.POST },
        { path: '/categories/:id', method: RequestMethod.PUT },
        { path: '/categories/:id', method: RequestMethod.DELETE },
      );
  }
}

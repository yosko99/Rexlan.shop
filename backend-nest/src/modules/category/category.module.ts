import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CategoryController } from './category.controller';

import { CategoryService } from './category.service';

import { PrismaService } from '../../prisma/prisma.service';
import { CartModule } from '../cart/cart.module';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CartModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyJWT)
      .forRoutes(
        { path: '/categories', method: RequestMethod.POST },
        { path: '/categories/:id', method: RequestMethod.PUT },
        { path: '/categories/:id', method: RequestMethod.DELETE },
      );
  }
}

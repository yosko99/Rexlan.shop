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
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';
import { UserModule } from '../user/user.module';
import { CheckIfUploadsFolderExists } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';

@Module({
  imports: [CartModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExists, VerifyJWT).forRoutes(
      {
        path: '/categories',
        method: RequestMethod.POST,
      },
      {
        path: '/categories/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/categories/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

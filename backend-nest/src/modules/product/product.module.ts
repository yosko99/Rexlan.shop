import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProductsController } from './product.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { ProductService } from './product.service';
import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';
import { UserModule } from '../user/user.module';
import { CheckIfUploadsFolderExists } from '../../middleware/utils/checkIfUploadsFolderExists.middleware';

@Module({
  imports: [UserModule],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExists, VerifyJWT).forRoutes(
      {
        path: '/products',
        method: RequestMethod.POST,
      },
      {
        path: '/products/:id',
        method: RequestMethod.PUT,
      },
    );

    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/products/:id/reviews',
        method: RequestMethod.POST,
      },
      {
        path: '/products/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

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

@Module({
  imports: [UserModule],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
      {
        path: '/products',
        method: RequestMethod.POST,
      },
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

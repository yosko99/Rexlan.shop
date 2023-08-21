import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProductsController } from './products.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from './products.service';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes(
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

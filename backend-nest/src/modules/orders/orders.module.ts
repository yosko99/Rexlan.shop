import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { OrdersController } from './orders.controller';

import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyJWTMiddleware } from 'src/middleware/user/verifyJWT.middleware';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, ProductsService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/orders',
      method: RequestMethod.POST,
    });
  }
}

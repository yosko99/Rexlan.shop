import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { OrdersController } from './orders.controller';

import { OrdersService } from './orders.service';
import { PrismaService } from '../../prisma/prisma.service';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/orders',
        method: RequestMethod.POST,
      },
      {
        path: '/orders/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/orders/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

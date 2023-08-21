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
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    ProductsService,
    UsersService,
    MailService,
  ],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/orders',
      method: RequestMethod.POST,
    });
  }
}

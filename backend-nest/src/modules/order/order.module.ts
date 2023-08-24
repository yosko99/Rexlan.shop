import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';
import { PrismaService } from '../../prisma/prisma.service';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
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

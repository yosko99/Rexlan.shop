import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CartController } from './cart.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from './cart.service';
import { ProductModule } from '../product/product.module';
import { VerifyJWT } from 'src/middleware/utils/verifyJWT.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes({
      path: '/carts/:id',
      method: RequestMethod.DELETE,
    });
  }
}

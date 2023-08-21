import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CartsController } from './carts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from './carts.service';
import { ProductsModule } from '../products/products.module';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
  exports: [CartsService],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes({
      path: '/carts/:id',
      method: RequestMethod.DELETE,
    });
  }
}

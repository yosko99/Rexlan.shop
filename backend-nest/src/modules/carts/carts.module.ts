import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CartsController } from './carts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CartsService } from './carts.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [CartsController],
  providers: [PrismaService, CartsService, ProductsService],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: '/carts/:cartID',
      method: RequestMethod.GET,
    });
  }
}

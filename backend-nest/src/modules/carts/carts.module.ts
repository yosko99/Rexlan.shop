import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CartsController } from './carts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from './carts.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
  exports: [CartsService],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

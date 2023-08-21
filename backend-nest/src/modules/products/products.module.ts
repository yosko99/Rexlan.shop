import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ProductsController } from './products.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

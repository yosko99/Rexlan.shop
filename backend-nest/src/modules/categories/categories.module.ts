import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CategoriesController } from './categories.controller';

import { CategoriesService } from '../categories/categories.service';

import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    CartsService,
    ProductsService,
    UsersService,
    MailService,
  ],
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

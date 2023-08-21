import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CartsController } from './carts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { CartsService } from './carts.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CartsController],
  providers: [
    PrismaService,
    CartsService,
    ProductsService,
    UsersService,
    MailService,
  ],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}

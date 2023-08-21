import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProductsController } from './products.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { ProductsService } from './products.service';
import { VerifyJWTMiddleware } from 'src/middleware/utils/verifyJWT.middleware';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, UsersService, MailService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/products',
        method: RequestMethod.POST,
      },
      {
        path: '/products/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/products/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

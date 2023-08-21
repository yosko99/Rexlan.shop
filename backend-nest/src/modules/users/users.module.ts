import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { VerifyJWTMiddleware } from '../../middleware/utils/verifyJWT.middleware';

import { UsersController } from './users.controller';

import { MailService } from '../../mail/mail.service';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService, PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/users/current',
        method: RequestMethod.PUT,
      },
      {
        path: '/users/current/orders',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/password',
        method: RequestMethod.PUT,
      },
      {
        path: '/users',
        method: RequestMethod.GET,
      },
    );
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { VerifyJWTMiddleware } from '../../middleware/utils/verifyJWT.middleware';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
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
      {
        path: '/users/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { VerifyJWT } from '../../middleware/utils/verifyJWT.middleware';

import { UserController } from './user.controller';

import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJWT).forRoutes(
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

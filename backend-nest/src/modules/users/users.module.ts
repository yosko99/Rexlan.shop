import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckExistingUserMiddleware } from '../../middleware/user/checkExistingUser.middleware';
import { VerifyJWTMiddleware } from '../../middleware/user/verifyJWT.middleware';

import { CartsModule } from '../carts/carts.module';

import { cartShema } from '../carts/schemas/cart.schema';
import { userSchema } from './schemas/user.schema';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Cart', schema: cartShema },
    ]),
    CartsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingUserMiddleware).forRoutes(
      {
        path: '/users/:_id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/users/user/:_id',
        method: RequestMethod.GET,
      },
      {
        path: '/users/user/:_id',
        method: RequestMethod.PUT,
      },
    );

    consumer.apply(VerifyJWTMiddleware).forRoutes(
      {
        path: '/users/current',
        method: RequestMethod.PUT,
      },
      {
        path: '/users/current',
        method: RequestMethod.GET,
      },
      {
        path: '/users/current/change-password',
        method: RequestMethod.PUT,
      },
    );
  }
}

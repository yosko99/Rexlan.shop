import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckExistingUserMiddleware } from '../../middleware/user/checkExistingUser.middleware';

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
    consumer.apply(CheckExistingUserMiddleware).forRoutes({
      path: '/users/:_id',
      method: RequestMethod.DELETE,
    });
  }
}

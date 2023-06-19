import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckExistingCartFromParamMiddleware } from '../../middleware/cart/checkExistingCartFromParam.middleware';

import { productSchema } from '../products/schemas/product.schema';
import { orderSchema } from '../orders/schemas/order.schema';
import { userSchema } from '../users/schemas/user.schema';
import { cartShema } from './schemas/cart.schema';

import { CartsService } from './carts.service';

import { CartsControler } from './carts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Order', schema: orderSchema },
      { name: 'User', schema: userSchema },
      { name: 'Cart', schema: cartShema },
    ]),
  ],
  controllers: [CartsControler],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingCartFromParamMiddleware).forRoutes(
      {
        path: '/carts/:cartID',
        method: RequestMethod.GET,
      },
      {
        path: '/carts/:cartID',
        method: RequestMethod.DELETE,
      },
    );
  }
}

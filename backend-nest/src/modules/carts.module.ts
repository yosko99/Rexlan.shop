import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { productSchema } from '../schemas/product.schema';
import { orderSchema } from '../schemas/order.schema';
import { userSchema } from '../schemas/user.schema';
import { cartShema } from '../schemas/cart.schema';

import { CartsControler } from '../controllers/carts.controller';

import { CartsService } from '../services/carts.service';

import { CheckExistingCartFromParamMiddleware } from '../middleware/cart/checkExistingCartFromParam.middleware';

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

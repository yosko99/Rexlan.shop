import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CheckExistingCartFromParamMiddleware } from '../../middleware/cart/checkExistingCartFromParam.middleware';
import { CheckExistingCartFromBodyMiddleware } from '../../middleware/cart/checkExistingCartFromBody.middleware';
import { CheckExistingOrderMiddleware } from '../../middleware/order/checkExistingOrder.middleware';
import { InitOrderInfoMiddleware } from '../../middleware/order/initOrderInfo.middleware';

import { OrdersController } from './orders.controller';

import { orderSchema } from './schemas/order.schema';
import { cartShema } from '../carts/schemas/cart.schema';

import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: orderSchema },
      { name: 'Cart', schema: cartShema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckExistingOrderMiddleware).forRoutes(
      {
        path: '/orders/:cartID',
        method: RequestMethod.GET,
      },
      {
        path: '/orders/:cartID',
        method: RequestMethod.DELETE,
      },
    );

    consumer.apply(CheckExistingCartFromParamMiddleware).forRoutes({
      path: '/orders/user/:cartID',
      method: RequestMethod.GET,
    });

    consumer
      .apply(CheckExistingCartFromBodyMiddleware, InitOrderInfoMiddleware)
      .forRoutes({
        path: '/orders',
        method: RequestMethod.POST,
      });
  }
}

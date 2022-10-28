import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { CartType } from '../../types/cart.types';
import { OrderType } from '../../types/order.types';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:cartID')
  getOrder(@RequestData('order') currentOrder: OrderType) {
    return currentOrder;
  }

  @Get('/user/:cartID')
  getUserOrders(@RequestData('cart') currentCart: CartType) {
    return this.ordersService.getUserOrders(currentCart);
  }

  @Delete('/:cartID')
  deleteOrder(
    @RequestData('order') currentOrder: OrderType,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.ordersService.deleteOrder(currentOrder, currentLang);
  }

  @Post()
  createOrder(
    @RequestData('orderInfo') currentOrderInfo: OrderType,
    @Body('cartID') cartID: string,
  ) {
    return this.ordersService.createOrder(currentOrderInfo, cartID);
  }
}

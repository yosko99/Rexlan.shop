import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { CurrentLang } from '../decorators/currentLang.decorator';
import { OrderInfo } from '../decorators/orderInfo.decorator';
import { Order } from '../decorators/order.decorator';
import { Cart } from '../decorators/cart.decorator';

import { CartType } from '../types/cart.types';
import { OrderType } from '../types/order.types';

import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:cartID')
  getOrder(@Order() currentOrder: OrderType) {
    return currentOrder;
  }

  @Get('/user/:cartID')
  getUserOrders(@Cart() currentCart: CartType) {
    return this.ordersService.getUserOrders(currentCart);
  }

  @Delete('/:cartID')
  deleteOrder(
    @Order() currentOrder: OrderType,
    @CurrentLang() currentLang: string,
  ) {
    return this.ordersService.deleteOrder(currentOrder, currentLang);
  }

  @Post()
  createOrder(
    @OrderInfo() currentOrderInfo: OrderType,
    @Body('cartID') cartID: string,
  ) {
    return this.ordersService.createOrder(currentOrderInfo, cartID);
  }
}

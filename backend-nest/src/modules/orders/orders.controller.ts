import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { OrdersService } from './orders.service';
import { Token } from 'src/interfaces/token';
import { OrderDto } from 'src/dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:orderId')
  getOrder(
    @Param('orderId') orderId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.ordersService.getOrder(orderId, currentLang);
  }

  @Delete('/:orderId')
  deleteOrder(
    @Param('orderId') orderId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.ordersService.deleteOrder(orderId, currentLang);
  }

  @Post()
  createOrder(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @Body() orderDto: OrderDto,
  ) {
    return this.ordersService.createOrder(orderDto, userDataFromToken);
  }
}

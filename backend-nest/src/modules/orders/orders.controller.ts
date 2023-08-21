import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { OrdersService } from './orders.service';
import { Token } from 'src/interfaces/token';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery } from 'src/swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
  noTokenResponse,
} from 'src/swagger/apiResponseOptions';
import { CreateOrderDto } from 'src/dto/order.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/:id')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Fetch order' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(noTokenResponse)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse({ status: 200, description: 'Order fetched' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  getOrder(
    @Param('id') orderId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.ordersService.getOrder(orderId, currentLang);
  }

  @Delete('/:id')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Delete order' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Order deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  deleteOrder(
    @Param('id') orderId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.ordersService.deleteOrder(
      orderId,
      userDataFromToken,
      currentLang,
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse(missingFieldsResponse)
  @ApiResponse({ status: 201, description: 'Order created' })
  createOrder(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @Body() orderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(orderDto, userDataFromToken);
  }
}

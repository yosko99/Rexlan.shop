import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { OrderService } from './order.service';
import { Token } from '../../interfaces/token';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery } from '../../swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
  noTokenResponse,
} from '../../swagger/apiResponseOptions';
import { CreateOrderDto } from '../../dto/order.dto';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
    return this.orderService.getOrder(orderId, currentLang);
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
    return this.orderService.deleteOrder(
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
    @Headers('authorization') tokenHeader: string,
    @Body() orderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(orderDto, tokenHeader);
  }
}

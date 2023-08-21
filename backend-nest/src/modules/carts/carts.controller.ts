import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { CartsService } from './carts.service';
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
  noTokenAndNoAdminResponse,
} from 'src/swagger/apiResponseOptions';
import { AddCartProductDto } from 'src/dto/cart.dto';
import { Token } from 'src/interfaces/token';

@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/:id/products')
  @ApiOperation({ summary: 'Fetch cart products' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Cart products fetched' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  getCartProducts(
    @Param('id') cartId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.getCartProducts(cartId, currentLang);
  }

  @Post('/:id/products')
  @ApiOperation({ summary: 'Add cart product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 201, description: 'Cart product added' })
  @ApiResponse({ status: 404, description: 'Cart or product not found' })
  addProductToCart(
    @Param('id') cartId: string,
    @Body() addCartProductDto: AddCartProductDto,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.addProductToCart(
      cartId,
      addCartProductDto,
      currentLang,
    );
  }

  @Delete('/:cartId/products/:productId')
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Cart product removed' })
  @ApiResponse({ status: 404, description: 'Cart or product not found' })
  removeProductFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.removeProductFromCart(
      cartId,
      productId,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete cart' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Cart deleted' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  deleteCart(
    @Param('id') cartId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.deleteCart(cartId, userDataFromToken, currentLang);
  }
}

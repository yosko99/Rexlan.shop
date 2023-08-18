import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { CartType } from '../../types/cart.types';

import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/:cartID')
  getCart(@RequestData('cart') cart: CartType) {
    return cart;
  }

  @Get('/products/:cartID')
  getCartProducts(
    @Param('cartID') cartID: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.getCartProducts(cartID, currentLang);
  }

  @Post()
  addProductToCart(
    @Body('productId') productId: string,
    @Body('cartId') cartId: string,
    @Body('productQuantity') productQuantity: number,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.addProductToCart(
      productId,
      cartId,
      productQuantity,
      currentLang,
    );
  }

  @Put('/products')
  removeProductFromCart(
    @Body('cartId') cartId: string,
    @Body('productId') productId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.removeProductFromCart(
      cartId,
      productId,
      currentLang,
    );
  }

  @Delete('/:cartID')
  deleteCart(
    @Param('id') cartId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.cartsService.deleteCart(cartId, currentLang);
  }
}

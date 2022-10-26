import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import mongoose from 'mongoose';

import { CurrentLang } from '../../decorators/currentLang.decorator';
import { Cart } from '../../decorators/cart.decorator';

import { CartType } from '../../types/cart.types';

import { CartsService } from './carts.service';

@Controller('carts')
export class CartsControler {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/:cartID')
  getCart(@Cart() cart: CartType) {
    return cart;
  }

  @Get('/products/:cartID')
  getCartProducts(
    @Param('cartID') cartID: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.cartsService.getCartProducts(cartID, currentLang);
  }

  @Post()
  addProductToCart(
    @Body('productID') productID: string,
    @Body('cartID') cartID: string,
    @Body('productQuantity') productQuantity: number,
    @CurrentLang() currentLang: string,
  ) {
    return this.cartsService.addProductToCart(
      productID,
      cartID,
      productQuantity,
      currentLang,
    );
  }

  @Put('/products')
  deleteProductFromCart(
    @Body('cartID') cartID: string,
    @Body('productID') productID: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.cartsService.deleteProductFromCart(
      cartID,
      productID,
      currentLang,
    );
  }

  @Delete('/:cartID')
  deleteCart(
    @Cart() currentCart: mongoose.Document<CartType> & CartType,
    @Query('reassignCartToUser') reassignCartToUser: 'true' | 'false',
    @CurrentLang() currentLang: string,
  ) {
    return this.cartsService.deleteCart(
      currentCart,
      reassignCartToUser,
      currentLang,
    );
  }
}

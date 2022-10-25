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

import { CurrentLang } from '../decorators/currentLang.decorator';
import { Product } from '../decorators/product.decorator';

import { ProductsService } from '../services/products.service';

import { productSortingType, ProductType } from '../types/product.types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('qty') qty: string, @CurrentLang() currentLang: string) {
    return this.productsService.getProducts(qty, currentLang);
  }

  @Get('/:id')
  getProduct(
    @Param('id') productID: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.productsService.getProduct(productID, currentLang);
  }

  @Get('/category/:category')
  getProdcutsByCategory(
    @Param('category') categoryName: string,
    @CurrentLang() currentLang: string,
    @Query('qty') qty: string,
  ) {
    return this.productsService.getProductsByCategory(
      qty,
      categoryName,
      currentLang,
    );
  }

  @Get('/sort/:attribute')
  getProductsSortedByAttribute(
    @Param('attribute') productAttribute: productSortingType,
    @CurrentLang() currentLang: string,
    @Query('qty') qty: string,
  ) {
    return this.productsService.getProductsSortedByAttribute(
      qty,
      productAttribute,
      currentLang,
    );
  }

  @Get('/regex/:pattern')
  getProductsByQueryString(
    @Param('pattern') pattern: RegExp,
    @CurrentLang() currentLang: string,
  ) {
    return this.productsService.getProductsByQueryString(pattern, currentLang);
  }

  @Post()
  createProduct(
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('category') category: string,
    @Body('image') image: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.productsService.createProduct(
      title,
      price,
      description,
      category,
      image,
      currentLang,
    );
  }

  @Put('/:id')
  updateProduct(
    @Product() currentProduct: mongoose.Document<ProductType> & ProductType,
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('category') category: string,
    @Body('image') image: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.productsService.updateProduct(
      currentProduct,
      title,
      price,
      description,
      category,
      image,
      currentLang,
    );
  }

  @Delete('/:id')
  deleteProduct(
    @Product() currentProduct: mongoose.Document<ProductType> & ProductType,
    @CurrentLang() currentLang: string,
  ) {
    return this.productsService.deleteProduct(currentProduct, currentLang);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CurrentLang } from 'src/decorators/currentLang.decorator';

import { ProductsService } from 'src/services/products.service';

import { productSortingType } from 'src/types/product.types';

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
}

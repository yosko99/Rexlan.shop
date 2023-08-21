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

import { ProductsService } from './products.service';

import { RequestData } from '../../decorators/requestData.decorator';
import { ProductSortAttributes } from 'src/interfaces/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('qty') qty: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.getProducts(qty, currentLang);
  }

  @Get('/:id')
  getProduct(
    @Param('id') productId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.getProduct(productId, currentLang);
  }

  @Get('/category/:category')
  getProdcutsByCategory(
    @Param('category') categoryName: string,
    @RequestData('currentLang') currentLang: string,
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
    @Param('attribute') productAttribute: ProductSortAttributes,
    @RequestData('currentLang') currentLang: string,
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
    @Param('pattern') pattern: string,
    @RequestData('currentLang') currentLang: string,
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
    @RequestData('currentLang') currentLang: string,
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
    @Param('id') productId: string,
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('category') category: string,
    @Body('image') image: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.updateProduct(
      productId,
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
    @Param('id') productId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.deleteProduct(productId, currentLang);
  }
}

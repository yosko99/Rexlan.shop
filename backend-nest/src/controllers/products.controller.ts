import { Controller, Get, Query } from '@nestjs/common';

import { CurrentLang } from 'src/decorators/currentLang.decorator';

import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('qty') qty: string, @CurrentLang() currentLang: string) {
    return this.productsService.getProducts(qty, currentLang);
  }
}

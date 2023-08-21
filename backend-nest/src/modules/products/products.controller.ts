import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { RequestData } from '../../decorators/requestData.decorator';
import { ProductSortAttributes } from 'src/interfaces/product';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery, quantityQuery } from 'src/swagger/apiQueryOptions';
import { productSortParam } from 'src/swagger/apiParamOptions';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from 'src/swagger/apiResponseOptions';
import { Token } from 'src/interfaces/token';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all products' })
  @ApiQuery(quantityQuery)
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Products fetched' })
  getProducts(
    @Query('qty') qty: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.getProducts(qty, currentLang);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch product by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Product fetched' })
  @ApiResponse({ status: 404, description: 'Product with id not found' })
  getProduct(
    @Param('id') productId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.getProduct(productId, currentLang);
  }

  @Get('/category/:category')
  @ApiOperation({ summary: 'Fetch products by category name' })
  @ApiQuery(quantityQuery)
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Products in category fetched' })
  getProductsByCategory(
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
  @ApiOperation({ summary: 'Fetch products sorted by attribute' })
  @ApiQuery(quantityQuery)
  @ApiQuery(currentLangQuery)
  @ApiParam(productSortParam)
  @ApiResponse({ status: 200, description: 'Products fetched' })
  @ApiResponse({ status: 422, description: 'No data with selected attribute' })
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
  @ApiOperation({ summary: 'Fetch products by string pattern' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Products fetched' })
  getProductsByQueryString(
    @Param('pattern') pattern: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.getProductsByQueryString(pattern, currentLang);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Create new product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 404, description: 'Selected category not found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.productsService.createProduct(
      createProductDto,
      userDataFromToken,
      currentLang,
    );
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Update product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 404, description: 'Selected category not found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') productId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.updateProduct(
      updateProductDto,
      productId,
      userDataFromToken,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Delete product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteProduct(
    @Param('id') productId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productsService.deleteProduct(
      productId,
      userDataFromToken,
      currentLang,
    );
  }
}

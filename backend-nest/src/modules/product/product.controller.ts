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

import { ProductService } from './product.service';

import { RequestData } from '../../decorators/requestData.decorator';
import { ProductSortAttributes } from '../../interfaces/product';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery, quantityQuery } from '../../swagger/apiQueryOptions';
import { productSortParam } from '../../swagger/apiParamOptions';
import { CreateProductDto, UpdateProductDto } from '../../dto/product.dto';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from '../../swagger/apiResponseOptions';
import { Token } from '../../interfaces/token';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all products' })
  @ApiQuery(quantityQuery)
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Products fetched' })
  getProducts(
    @Query('qty') qty: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productService.getProducts(qty, currentLang);
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
    return this.productService.getProduct(productId, currentLang);
  }

  @Get('/category/:category')
  @ApiOperation({ summary: 'Fetch products by category name' })
  @ApiQuery(quantityQuery)
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Products in category fetched' })
  @ApiResponse({ status: 404, description: 'Could not find category' })
  getProductsByCategory(
    @Param('category') categoryName: string,
    @RequestData('currentLang') currentLang: string,
    @Query('qty') qty: string,
  ) {
    return this.productService.getProductsByCategory(
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
    return this.productService.getProductsSortedByAttribute(
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
    return this.productService.getProductsByQueryString(pattern, currentLang);
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
    return this.productService.createProduct(
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
    return this.productService.updateProduct(
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
    return this.productService.deleteProduct(
      productId,
      userDataFromToken,
      currentLang,
    );
  }
}

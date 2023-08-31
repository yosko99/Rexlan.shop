import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ProductService } from './product.service';

import { RequestData } from '../../decorators/requestData.decorator';
import { ProductSortAttributes } from '../../interfaces/product';
import {
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  currentLangQuery,
  productIdsQuery,
  quantityQuery,
} from '../../swagger/apiQueryOptions';
import { productSortParam } from '../../swagger/apiParamOptions';
import {
  CreateProductDto,
  CreateProductReviewDto,
  UpdateProductDto,
} from '../../dto/product.dto';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from '../../swagger/apiResponseOptions';
import { Token } from '../../interfaces/token';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFilter } from '../../config/multer';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch products' })
  @ApiQuery(quantityQuery)
  @ApiQuery(productIdsQuery)
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Products fetched',
  })
  getProducts(
    @Query('qty') qty: string,
    @Query('ids') ids: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productService.getProducts(qty, currentLang, ids);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch product by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Product fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Product with id not found',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Products in category fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Could not find category',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Products fetched',
  })
  @ApiResponse({
    status: 422,
    description: 'No data with selected attribute',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Products fetched',
  })
  getProductsByQueryString(
    @Param('pattern') pattern: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productService.getProductsByQueryString(pattern, currentLang);
  }

  @Post('/:id/reviews')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create review for product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse({
    status: 200,
    description: 'Review user updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Product or User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'User already added review',
  })
  createProductReview(
    @Param('id') productId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @Body() createProductReviewDto: CreateProductReviewDto,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productService.createProductReview(
      productId,
      createProductReviewDto,
      userDataFromToken,
      currentLang,
    );
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Create new product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 201,
    description: 'Product created',
  })
  @ApiResponse({
    status: 404,
    description: 'Category or User not found',
  })
  createProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.productService.createProduct(
      createProductDto,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Update product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Product updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Category or User not found',
  })
  updateProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') productId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.productService.updateProduct(
      updateProductDto,
      productId,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Delete product' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Product deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product or User not found',
  })
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

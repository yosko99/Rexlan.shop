import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { RequestData } from '../../decorators/requestData.decorator';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { currentLangQuery } from 'src/swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from 'src/swagger/apiResponseOptions';
import { Token } from 'src/interfaces/token';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all categories' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Categories fetched' })
  getCategories(@RequestData('currentLang') currentLang: string) {
    return this.categoryService.getCategories(currentLang);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Category fetched' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  getCategory(
    @Param('id') categoryId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoryService.getCategory(categoryId, currentLang);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create category' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 201, description: 'Category created' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoryService.createCategory(
      createCategoryDto,
      userDataFromToken,
      currentLang,
    );
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update category' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Category updated' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  updateCategory(
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.categoryService.updateCategory(
      categoryId,
      updateCategoryDto,
      userDataFromToken,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Category deleted' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiQuery(currentLangQuery)
  deleteCategory(
    @Param('id') categoryId: string,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.categoryService.deleteCategory(
      categoryId,
      userDataFromToken,
      currentLang,
    );
  }
}

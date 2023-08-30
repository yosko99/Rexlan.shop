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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { RequestData } from '../../decorators/requestData.decorator';
import {
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery } from '../../swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from '../../swagger/apiResponseOptions';
import { Token } from '../../interfaces/token';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFilter } from '../../config/multer';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all categories' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Categories fetched',
  })
  getCategories(@RequestData('currentLang') currentLang: string) {
    return this.categoryService.getCategories(currentLang);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Category fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  getCategory(
    @Param('id') categoryId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoryService.getCategory(categoryId, currentLang);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('bannerImage', multerFilter))
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create category' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 201,
    description: 'Category created',
  })
  @ApiResponse({
    status: 409,
    description: 'Category name already exists',
  })
  createCategory(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoryService.createCategory(
      createCategoryDto,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update category' })
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('bannerImage', multerFilter))
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Category updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Category name already exists',
  })
  updateCategory(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.categoryService.updateCategory(
      categoryId,
      updateCategoryDto,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Category deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
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

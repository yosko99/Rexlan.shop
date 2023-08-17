import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { RequestData } from '../../decorators/requestData.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@RequestData('currentLang') currentLang: string) {
    return this.categoriesService.getCategories(currentLang);
  }

  @Get('/:id')
  getCategory(
    @Param('id') categoryId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.getCategory(categoryId, currentLang);
  }

  @Post()
  createCategory(
    @Body('title') title: string,
    @Body('bannerImage') bannerImage: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.createCategory(
      title,
      bannerImage,
      currentLang,
    );
  }

  @Put('/:id')
  updateCategory(
    @Param('id') categoryId: string,
    @Body('title') title: string,
    @Body('bannerImage') bannerImg: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.updateCategory(
      categoryId,
      title,
      bannerImg,
      currentLang,
    );
  }

  @Delete('/:id')
  deleteCategory(
    @Param('id') categoryId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.deleteCategory(categoryId, currentLang);
  }
}

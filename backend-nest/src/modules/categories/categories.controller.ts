import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import mongoose from 'mongoose';

import { CategoriesService } from './categories.service';

import { CategoryType } from '../../types/category.types';

import { RequestData } from '../../decorators/requestData.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@RequestData('currentLang') currentLang: string) {
    return this.categoriesService.getCategories(currentLang);
  }

  @Get('/:_id')
  getCategory(
    @RequestData('category') currentCategory: CategoryType,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.getCategory(
      currentCategory.name,
      currentLang,
    );
  }

  @Post()
  createCategory(
    @Body('name') name: string,
    @Body('bannerImage') bannerImg: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.createCategory(name, bannerImg, currentLang);
  }

  @Put('/:_id')
  updateCategory(
    @RequestData('category')
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    @Body('name') name: string,
    @Body('bannerImage') bannerImg: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.updateCategory(
      currentCategory,
      name,
      bannerImg,
      currentLang,
    );
  }

  @Delete('/:_id')
  deleteCategory(
    @RequestData('category')
    currentCategory: mongoose.Document<CategoryType> & CategoryType,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.categoriesService.deleteCategory(currentCategory, currentLang);
  }
}

import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import mongoose from 'mongoose';

import { Category } from 'src/decorators/category.decorator';
import { CurrentLang } from 'src/decorators/currentLang.decorator';

import { CategoriesService } from 'src/services/categories.service';
import { CategoryType } from 'src/types/category.types';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@CurrentLang() currentLang: string) {
    return this.categoriesService.getCategories(currentLang);
  }

  @Get('/:_id')
  getCategory(
    @Category() category: CategoryType,
    @CurrentLang() currentLang: string,
  ) {
    return this.categoriesService.getCategory(category.name, currentLang);
  }

  @Post()
  createCategory(
    @Body('name') name: string,
    @Body('bannerImg') bannerImg: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.categoriesService.createCategory(name, bannerImg, currentLang);
  }

  @Put('/:_id')
  updateCategory(
    @Category() curentcategory: mongoose.Document<CategoryType> & CategoryType,
    @Body('name') name: string,
    @Body('bannerImg') bannerImg: string,
    @CurrentLang() currentLang: string,
  ) {
    return this.categoriesService.upateCategory(
      curentcategory,
      name,
      bannerImg,
      currentLang,
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ILayout } from 'src/types/layout.types';

import { RequestData } from '../../decorators/requestData.decorator';

import { LayoutService } from './layout.service';

@Controller('layouts')
export class DeliveriesController {
  constructor(private readonly layoutService: LayoutService) {}

  @Get()
  getLayouts(@RequestData('currentLang') currentLang: string) {
    return this.layoutService.getLayouts(currentLang);
  }

  @Get('/:id')
  getLayoutByID(
    @RequestData('currentLang') currentLang: string,
    @Param('id') id: string,
  ) {
    return this.layoutService.getLayoutByID(currentLang, id);
  }

  @Post()
  createLayout(@Body() layoutData: ILayout) {
    return this.layoutService.createLayout(layoutData);
  }

  @Put('/:id')
  updateLayout(@Body() layoutData: ILayout, @Param('id') id: string) {
    return this.layoutService.updateLayout(layoutData, id);
  }

  @Delete('/:id')
  deleteLayout(@Param('id') id: string) {
    return this.layoutService.deleteLayout(id);
  }
}

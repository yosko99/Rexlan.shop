import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILayout } from 'src/types/layout.types';

import lang from '../../resources/lang';

@Injectable()
export class LayoutService {
  constructor(
    @InjectModel('Layout')
    private readonly layoutModel: Model<ILayout>,
  ) {}

  async createLayout(layoutData: ILayout) {
    const newLayout = await this.layoutModel.create({
      ...layoutData,
    });

    return newLayout;
  }

  async updateLayout(layoutData: ILayout, id: string) {
    const layout = await this.layoutModel.updateOne({ _id: id }, layoutData);

    return {
      msg: 'Layout updated',
      layout,
    };
  }

  async getLayouts(currentLang: string) {
    const layouts = await this.layoutModel.find({});

    if (layouts === null) {
      return new NotFoundException(lang[currentLang].global.noData);
    }

    return layouts;
  }

  async getLayoutByID(currentLang: string, id: string) {
    const layout = await this.layoutModel.findOne({ _id: id });

    if (layout === null) {
      return new NotFoundException(lang[currentLang].global.noData);
    }

    return layout;
  }

  async deleteLayout(id: string) {
    await this.layoutModel.deleteOne({ _id: id });

    return {
      msg: 'Layout deleted',
    };
  }
}

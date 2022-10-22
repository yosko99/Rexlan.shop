import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

import { CategoryType } from 'src/types/category.types';

type ExtendedRequest = Request & { category: CategoryType };

@Injectable()
export class CheckExistingCategoryMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: mongoose.Model<CategoryType>,
  ) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { _id: categoryID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
      return res.status(404).send('Invalid id format.');
    }

    const checkExistingCategory = await this.categoryModel
      .findOne({ _id: categoryID })
      .select('-__v');

    if (checkExistingCategory === null) {
      return res
        .status(404)
        .send('Category with provided name does not exists.');
    }

    req.category = checkExistingCategory;

    next();
  }
}

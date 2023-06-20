import { Request, Response, NextFunction } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { ProductType } from '../../types/product.types';

type ExtendedRequest = Request & { product: ProductType };

@Injectable()
export class CheckExistingProductMiddleware {
  constructor(
    @InjectModel('Product')
    private readonly productModel: mongoose.Model<ProductType>,
  ) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { id: productID } = req.params;

    const product = await this.productModel.findOne({ id: productID });

    if (product === null) {
      return res.status(404).send('Cannot find product with provided id.');
    }

    req.product = product;

    next();
  }
}

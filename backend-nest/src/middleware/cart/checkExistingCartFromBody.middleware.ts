import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { CartType } from '../../types/cart.types';

type ExtendedRequest = Request & { cart: CartType };

@Injectable()
export class CheckExistingCartFromBodyMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: mongoose.Model<CartType>,
  ) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { cartID } = req.body;

    if (cartID === undefined || !mongoose.Types.ObjectId.isValid(cartID)) {
      return res.status(404).send('Invalid or not provided cart ID');
    }
    const doesCartExist = await this.cartModel.findOne({ _id: cartID });

    if (doesCartExist === null) {
      return res.status(404).send('Invalid or not provided cart ID');
    }

    req.cart = doesCartExist;

    next();
  }
}

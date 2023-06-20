import { Request, Response, NextFunction } from 'express';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { OrderType } from '../../types/order.types';

type ExtendedRequest = Request & { order: OrderType };

@Injectable()
export class CheckExistingOrderMiddleware {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: mongoose.Model<OrderType>,
  ) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { cartID } = req.params;

    if (cartID === undefined || !mongoose.Types.ObjectId.isValid(cartID)) {
      return res.status(404).send('Invalid or not provided cart ID');
    }
    const doesOrderExist = await this.orderModel
      .findOne({ cartID })
      .select('-__v -_id');

    if (doesOrderExist === null) {
      return res.status(404).send('Invalid or not provided cart ID');
    }

    req.order = doesOrderExist;

    next();
  }
}

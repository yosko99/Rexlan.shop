import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CartType } from '../types/cart.types';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel('Cart')
    private readonly categoryModel: Model<CartType>,
  ) {}

  async getCart(cartID: string) {}
}

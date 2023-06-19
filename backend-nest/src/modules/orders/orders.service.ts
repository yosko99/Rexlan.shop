import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CartType } from '../../types/cart.types';
import { OrderType } from '../../types/order.types';

import lang from '../../resources/lang';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<OrderType>,
  ) {}

  async getUserOrders(currentCart: CartType) {
    const orders = await this.orderModel
      .find({
        userID: currentCart.userID,
      })
      .where('orderStatus')
      .ne('Pending')
      .select('-__v -_id');

    if (orders === null) {
      return new NotFoundException('Invalid or not provided cart ID');
    }

    return orders;
  }

  async deleteOrder(currentOrder: OrderType, currentLang: string) {
    await this.orderModel.deleteOne({ cartID: currentOrder.cartID });

    return {
      msg: lang[currentLang].controllers.order.orderDeleted,
    };
  }

  async createOrder(currentOrderInfo: OrderType, cartID: string) {
    const newOrder = await this.orderModel.create({
      ...currentOrderInfo,
      cartID,
    });

    return {
      order: newOrder,
    };
  }
}

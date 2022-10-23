import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';

import { CartProductsType } from '../../types/product.types';
import { DummyDataType } from '../../types/dummyData.types';
import { OrderType } from '../../types/order.types';
import { CartType } from '../../types/cart.types';
import { UserType } from '../../types/user.types';

@Injectable()
export class TestService {
  dummyData: DummyDataType = {
    notLinkedCart: null,
    linkedCart: null,
    userLinkedWithCart: null,
    userNotLinkedWithCart: null,
    orderLinkedWithUser: null,
    userPassword: 'testing',
  };

  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartType>,
    @InjectModel('User')
    private readonly userModel: Model<UserType>,
    @InjectModel('Order')
    private readonly orderModel: Model<OrderType>,
  ) {}

  async initializeAndGetDummyData() {
    const exampleProducts: CartProductsType = {
      productID: '7',
      productQuantity: 1,
    };

    this.dummyData.notLinkedCart = await new this.cartModel({
      isLinked: false,
      products: [exampleProducts],
    }).save();

    this.dummyData.linkedCart = await new this.cartModel({
      isLinked: true,
      products: [exampleProducts],
    }).save();

    const hashedPassword = bcrypt.hashSync(this.dummyData.userPassword, 1);

    this.dummyData.userLinkedWithCart = await new this.userModel({
      email: 'test@test.gmail',
      password: hashedPassword,
      name: 'test',
      address: 'test',
      phone: 'test',
      isAdmin: true,
    }).save();

    this.dummyData.userNotLinkedWithCart = await new this.userModel({
      email: 'test2@test.bg',
      password: hashedPassword,
      name: 'test2',
      address: 'test2',
      phone: 'test2',
    }).save();

    this.dummyData.orderLinkedWithUser = await new this.orderModel({
      userID: this.dummyData.userLinkedWithCart._id,
      cartID: this.dummyData.linkedCart._id,
      products: [],
      selectedCourier: 'DHL',
      deliveryPrice: 0,
      zipcode: 1235,
      address: 'test',
      name: 'test',
      city: 'test',
      phone: '1',
      orderStatus: 'Processing',
    }).save();

    this.dummyData.linkedCart.userID = this.dummyData.userLinkedWithCart
      ._id as unknown as string;
    this.dummyData.userLinkedWithCart.cartID = this.dummyData.linkedCart
      ._id as unknown as string;

    await this.dummyData.linkedCart.save();
    await this.dummyData.userLinkedWithCart.save();

    return this.dummyData;
  }

  async deleteDummyData() {
    await this.orderModel.deleteOne({
      cartID: this.dummyData.orderLinkedWithUser.cartID,
    });

    await this.userModel.deleteMany({
      _id: [
        this.dummyData.userLinkedWithCart._id,
        this.dummyData.userNotLinkedWithCart._id,
      ],
    });

    await this.cartModel.deleteMany({
      _id: [this.dummyData.notLinkedCart._id, this.dummyData.linkedCart._id],
    });
  }
}

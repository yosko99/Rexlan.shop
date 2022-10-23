import mongoose, { ObjectId, Types } from 'mongoose';

import { CartType } from './cart.types';
import { OrderType } from './order.types';
import { UserType } from './user.types';

type DummyDataCartType = mongoose.Document<unknown, any, CartType> &
  CartType & {
    _id: Types.ObjectId;
  };

type DummyDataUserType = mongoose.Document<unknown, any, UserType> &
  UserType & {
    _id: Types.ObjectId;
  };

type DummyDataOrderType = mongoose.Document<unknown, any, OrderType> &
  OrderType & {
    _id: Types.ObjectId;
  };

export interface DummyDataType {
  notLinkedCart: DummyDataCartType;
  linkedCart: DummyDataCartType;
  userLinkedWithCart: DummyDataUserType;
  userNotLinkedWithCart: DummyDataUserType;
  orderLinkedWithUser: DummyDataOrderType;
  userPassword: string;
}

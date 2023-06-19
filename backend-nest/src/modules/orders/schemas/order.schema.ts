import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { CartProductsSchema } from '../../products/schemas/product.schema';

export const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
    },
    cartID: {
      type: Schema.Types.ObjectId,
    },
    orderStatus: {
      type: String,
      default: 'Pending',
    },
    selectedCourier: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    phone: {
      type: String,
    },
    productsPrice: {
      type: Number,
      default: 0,
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    products: {
      type: [CartProductsSchema],
    },
  },
  {
    timestamps: true,
  },
);

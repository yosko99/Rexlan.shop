import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { CartProductsSchema } from '../../products/schemas/product.schema';

export const cartShema = new Schema({
  products: {
    type: [CartProductsSchema],
  },
  isLinked: {
    type: Boolean,
    required: true,
  },
  userID: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },
});

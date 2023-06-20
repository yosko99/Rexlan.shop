import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const deliverySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  initialPrice: {
    type: Number,
    required: true,
  },
  priceToAddress: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

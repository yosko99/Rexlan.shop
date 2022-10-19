import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productTranslationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const productSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  categoryURL: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  translations: [productTranslationSchema],
});

interface ProductTranslationType {
  title: string;
  description: string;
  lang: string;
}

export interface ProductType {
  id: string;
  title: string;
  categoryURL: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  translations: ProductTranslationType[];
}

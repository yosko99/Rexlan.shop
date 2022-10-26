import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categoryTranslationSchema = new Schema(
  {
    name: {
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

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: String,
  },
  categoryURL: {
    type: String,
  },
  translations: [categoryTranslationSchema],
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTranslationSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
}, {
  _id: false
});

const productSchema = Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  categoryURL: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    rate: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  translations: [productTranslationSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

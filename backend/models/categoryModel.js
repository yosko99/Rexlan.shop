const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryTranslationSchema = Schema({
  name: {
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

const categorySchema = Schema({
  name: {
    type: String,
    required: true
  },
  bannerImage: {
    type: String
  },
  categoryURL: {
    type: String
  },
  translations: [categoryTranslationSchema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

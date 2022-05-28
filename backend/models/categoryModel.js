const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
  name: {
    type: String,
    required: true
  },
  bannerImage: {
    type: String
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

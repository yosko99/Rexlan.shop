const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');

const deleteEmptyCategory = async (category) => {
  const isCategoryEmpty = await Product.find({ category });

  // Current product is the only one in the category
  if (isCategoryEmpty.length === 1) {
    await Category.deleteOne({ name: category });
  }
};

module.exports = deleteEmptyCategory;

const Product = require('../../../models/productModel');
const Category = require('../../../models/categoryModel');

const deleteEmptyCategory = async (category) => {
  const isCategoryEmpty = await (await Product.find({ category })).length <= 1;

  // Current product is the only one in the category
  if (isCategoryEmpty) {
    await Category.deleteOne({ name: category });
  }
};

module.exports = deleteEmptyCategory;

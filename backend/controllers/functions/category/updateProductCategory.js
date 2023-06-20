const Category = require('../../../models/categoryModel');
const Product = require('../../../models/productModel');

const updateProductCategory = async (currentCategoryID, newCategoryName) => {
  const currentCategory = await Category.findOne({ _id: currentCategoryID });

  await Product.updateMany({ category: currentCategory.name }, {
    category: newCategoryName
  });
};

module.exports = updateProductCategory;

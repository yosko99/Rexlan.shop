const Category = require('../../../models/categoryModel');

const createNewCategory = async (categoryName) => {
  if (categoryName !== undefined) {
    const checkExistingCategory = await Category.findOne({ name: categoryName });

    if (checkExistingCategory === null) {
      const newCategory = new Category({
        name: categoryName,
        bannerImage: '',
        categoryURL: categoryName
      });

      await newCategory.save();
    }
  }
};

module.exports = createNewCategory;

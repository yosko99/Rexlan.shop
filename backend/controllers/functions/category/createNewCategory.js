const Category = require('../../../models/categoryModel');

const createNewCategory = async (category) => {
  if (category !== undefined) {
    const checkExistingCategory = await Category.findOne({ name: category });

    if (checkExistingCategory === null) {
      const newCategory = new Category({
        name: category,
        bannerImage: ''
      });

      await newCategory.save();
    }
  }
};

module.exports = createNewCategory;

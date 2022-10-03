const Category = require('../../../models/categoryModel');

const createCategory = async (currentLang, categoryName, bannerImage) => {
  if (categoryName !== undefined) {
    const checkExistingCategory = await Category.findOne({ name: categoryName });

    if (checkExistingCategory === null) {
      const newCategory = new Category({
        name: categoryName,
        bannerImage,
        categoryURL: categoryName,
        translations: []
      });

      if (currentLang !== 'en') {
        newCategory.translations.push({
          lang: currentLang,
          name: categoryName
        });
      }

      await newCategory.save();

      return true;
    } else {
      return false;
    }
  }
};

module.exports = createCategory;

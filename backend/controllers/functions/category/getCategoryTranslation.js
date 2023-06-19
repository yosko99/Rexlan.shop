const Category = require('../../../models/categoryModel');

const getCategoryTranslation = async (currentLang, categoryName) => {
  const category = await Category.findOne({
    name: categoryName
  });

  category.categoryURL = category.name;

  const [translation] = category.translations.filter((translation) => translation.lang === currentLang);

  if (translation !== undefined) {
    category.name = translation.name;
  }

  return category;
};

module.exports = getCategoryTranslation;

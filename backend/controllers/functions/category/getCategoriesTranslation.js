const getCategoryTranslation = require('./getCategoryTranslation');

const getCategoriesTranslation = async (currentLang, categories) => {
  const translatedCategories = await Promise.all(categories.map(async (category) => {
    return await getCategoryTranslation(currentLang, category.name);
  }));

  return translatedCategories;
};

module.exports = getCategoriesTranslation;

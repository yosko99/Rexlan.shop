const getCategoryTranslation = require('../category/getCategoryTranslation');

const getProductTranslation = async (currentLang, product) => {
  if (product === null) {
    return null;
  }

  const translatedCategory = await getCategoryTranslation(currentLang, product.category);
  const [translation] = product.translations.filter((translation) => translation.lang === currentLang);

  product.categoryURL = translatedCategory.categoryURL;

  if (translation !== undefined) {
    product.title = translation.title;
    product.description = translation.description;
    product.category = translatedCategory.name;
  }

  return product;
};

module.exports = getProductTranslation;

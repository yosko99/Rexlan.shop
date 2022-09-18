const getProductTranslation = (req, product) => {
  if (product === null) {
    return null;
  }

  const [translation] = product.translations.filter((translation) => translation.lang === req.currentLang);

  if (translation !== undefined) {
    product.title = translation.title;
    product.description = translation.description;
    product.category = translation.category;
  }

  return product;
};

module.exports = getProductTranslation;

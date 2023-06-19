const getProductTranslation = require('./getProductTranslation');

const getProductsTranslation = async (currentLang, products) => {
  const translatedProducts = await Promise.all(products.map(async (product) => {
    return await getProductTranslation(currentLang, product);
  }));

  return translatedProducts;
};

module.exports = getProductsTranslation;

const getProductTranslation = require('./getProductTranslation');

const getProductsTranslation = (req, products) => {
  const translatedProducts = [];

  products.forEach(product => {
    translatedProducts.push(getProductTranslation(req, product));
  });

  return translatedProducts;
};

module.exports = getProductsTranslation;

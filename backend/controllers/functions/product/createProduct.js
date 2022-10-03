const Product = require('../../../models/productModel');
const getMaxProductID = require('./getMaxProductID');

const createProduct = async (currentLang, { title, price, description, category, image }) => {
  const maxID = await getMaxProductID();

  const product = {
    title,
    price: price === undefined ? 0 : price,
    description,
    category,
    image,
    categoryURL: category,
    id: maxID,
    translations: []
  };

  if (currentLang !== 'en') {
    product.translations.push({
      lang: currentLang,
      title,
      description
    });
  }

  await Product.create(product);
};

module.exports = createProduct;

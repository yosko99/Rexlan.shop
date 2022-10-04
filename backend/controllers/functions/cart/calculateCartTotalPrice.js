const Product = require('../../../models/productModel');

const calculateCartTotalPrice = async (cartProducts) => {
  const productPrices = await Promise.all(cartProducts.map(async (product) => {
    const { price } = await Product.findOne({ id: product.productID });

    return price * product.productQuantity;
  }));

  return productPrices.length !== 0 ? productPrices.reduce((a, b) => a + b).toFixed(2) : 0;
};

module.exports = calculateCartTotalPrice;

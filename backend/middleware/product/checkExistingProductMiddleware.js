const Product = require('../../models/productModel');

const checkExistingProductMiddleware = async (req, res, next) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ id: productID });

  if (product === null) {
    return res.status(404).send('Cannot find product with provided id.');
  }

  req.product = product;

  next();
};

module.exports = checkExistingProductMiddleware;

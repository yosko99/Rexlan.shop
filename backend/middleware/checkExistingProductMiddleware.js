const Product = require('../models/productModel');
const mongoose = require('mongoose');

const checkExistingProductMiddleware = async (req, res, next) => {
  const { id: productID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(404).send('Invalid id format.');
  }

  const product = await Product.findOne({ id: productID });

  if (product === null) {
    return res.status(404).send('Cannot find product with provided id.');
  }

  next();
};

module.exports = checkExistingProductMiddleware;

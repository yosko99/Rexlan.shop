const Product = require('../models/productModel');

const checkValidProductID = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ id: productID });

  if (product === null) {
    return res.status(404).send('Cannot find product with provided id.');
  }

  next();
};

module.exports = checkValidProductID;

const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  const products = await Product.find({});

  res.json(products);
};

const Product = require('../models/productModel');
const getQueryQty = require('./functions/getQueryQty');

exports.getProducts = async (req, res) => {
  const productQuantity = getQueryQty(req.query.qty);

  const products = await Product
    .find({})
    .limit(productQuantity);

  res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findOne({
    id: req.params.id
  });

  if (product === null) {
    return res.status(404).send('Could not find data with provided ID');
  }

  res.status(200).json(product);
};

exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const productQuantity = getQueryQty(req.query.qty);

  const products = await Product.find({})
    .where('category')
    .equals(category)
    .limit(productQuantity);

  if (products === null || products.length === 0) {
    return res.status(404).send('Could not find data with provided category');
  }

  res.status(200).json(products);
};

exports.getProductsSortedBy = async (req, res) => {
  const productQuantity = getQueryQty(req.query.qty);
  const attribute = req.params.attribute;

  const products = await Product.find({})
    .sort({ [attribute]: -1 })
    .limit(productQuantity);

  if (products === null || products.length === 0) {
    return res.status(404).send('Could not find data');
  }

  res.status(200).json(products);
};

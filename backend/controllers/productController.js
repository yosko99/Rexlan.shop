const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  let products;
  if (req.query.qty !== undefined) {
    products = await Product.find({}).limit(req.query.qty);
  } else {
    products = await Product.find({});
  }

  res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findOne({
    id: req.params.id
  });

  res.status(200).json(product);
};

exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  let products;
  if (req.query.qty !== undefined) {
    products = await
    Product.find({})
      .where('category')
      .equals(category)
      .limit(req.query.qty);
  } else {
    products = await
    Product.find({})
      .where('category')
      .equals(category);
  }

  res.status(200).json(products);
};

exports.getProductsSortedBy = async (req, res) => {
  const attribute = req.params.attribute;

  let products;
  if (req.query.qty !== undefined) {
    products = await
    Product.find({})
      .sort({ [attribute]: -1 })
      .limit(req.query.qty);
  } else {
    products = await
    Product
      .find({})
      .sort({ [attribute]: -1 });
  }

  res.status(200).json(products);
};

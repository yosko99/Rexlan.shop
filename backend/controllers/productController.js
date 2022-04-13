const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  let products;
  if (req.query.qty !== undefined) {
    products = await Product.aggregate([
      {
        $sample: { size: Number(req.query.qty) }
      }]);
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

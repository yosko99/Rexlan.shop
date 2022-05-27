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
  }).select('-__v -_id');

  if (product === null) {
    return res.status(404).send('Could not find data with provided ID');
  }

  res.status(200).json(product);
};

exports.updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ id: productID });

  if (product === null) {
    return res.status(404).send('Cannot find product with provided id.');
  }

  const { title, price, description, category, image } = req.body;

  await Product.updateOne({ id: productID }, {
    title,
    price,
    description,
    category,
    image
  });

  await product.save();

  res.status(200).json({
    msg: 'Data updated'
  });
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

exports.getProductsByQueryString = async (req, res) => {
  const { pattern } = req.params;

  const products = await Product
    .find({
      title: {
        $regex: pattern,
        $options: 'si'
      }
    })
    .limit(4);

  res.status(200).json({
    products
  });
};

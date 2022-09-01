const deleteProductFromAllCarts = require('./functions/cart/deleteProductFromAllCarts');
const deleteEmptyCategory = require('./functions/category/deleteEmptyCategory');
const createNewCategory = require('./functions/category/createNewCategory');
const getMaxProductID = require('./functions/product/getMaxProductID');

const getQueryQty = require('./functions/utils/getQueryQty');

const Product = require('../models/productModel');

const lang = require('../resources/lang');

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
    return res.status(404).send(lang[req.currentLang].global.noDataWithProvidedID);
  }

  res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  await deleteEmptyCategory(req.product.category);
  await deleteProductFromAllCarts(productID);
  await Product.deleteOne({ id: productID });

  res.status(200).json({
    msg: lang[req.currentLang].global.dataDeleted
  });
};

exports.updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const { title, price, description, category, image } = req.body;

  await deleteEmptyCategory(req.product.category);

  await Product.updateOne({ id: productID }, {
    title,
    price,
    description,
    category,
    image
  });

  await createNewCategory(category);

  res.status(200).json({
    msg: `${lang[req.currentLang].global.data} ${lang[req.currentLang].global.updated.toLowerCase()}`
  });
};

exports.createProduct = async (req, res) => {
  const { title, price, description, category, image } = req.body;

  const maxID = await getMaxProductID();

  await Product.create({
    title,
    price: price === undefined ? 0 : price,
    description,
    category,
    image,
    id: maxID
  });

  await createNewCategory(category);

  res.status(200).json({
    msg: `${lang[req.currentLang].global.product} ${lang[req.currentLang].global.created.toLowerCase()}.`
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
    return res.status(206).json({
      products: [],
      msg: lang[req.currentLang].global.noDataWithProvidedCategory
    });
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
    return res.status(206).json({
      products: [],
      msg: lang[req.currentLang].global.couldNotFindData
    });
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

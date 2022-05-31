const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const deleteProductFromAllCarts = require('./functions/cart/deleteProductFromAllCarts');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  const { _id } = req.params;

  const category = await Category.findOne({ _id })
    .select('-__v');

  res.status(200).json(category);
};

exports.createCategory = async (req, res) => {
  const { name, bannerImage } = req.body;

  const checkIfCategoryExists = await Category.findOne({ name });

  if (checkIfCategoryExists !== null) {
    return res.status(500).send('Category with provided name already exists.');
  }

  await Category.create({
    name,
    bannerImage
  });

  res.status(200).json({
    msg: 'Category created.'
  });
};

exports.updateCategory = async (req, res) => {
  const { _id } = req.params;
  const { name, bannerImage } = req.body;

  await Category.updateOne({ _id }, {
    name,
    bannerImage
  });

  res.status(200).json({
    msg: 'Category updated.'
  });
};

exports.deleteCategory = async (req, res) => {
  const { _id } = req.params;

  const { name: categoryName } = await Category.findOne({ _id });
  const productsInProvidedCategory = await Product.find({ category: categoryName });

  if (productsInProvidedCategory !== null) {
    productsInProvidedCategory.forEach(async (product) => {
      await deleteProductFromAllCarts(product.id);
    });
  }

  await Product.deleteMany({ category: categoryName });
  await Category.deleteOne({ _id });

  res.status(200).json({
    msg: 'Category deleted.'
  });
};

const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const deleteProductFromAllCarts = require('./functions/deleteProductFromAllCarts');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json(categories);
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
  const { name: oldName } = req.params;
  const { name: newName, bannerImage } = req.body;

  await Category.updateOne({ oldName }, {
    name: newName,
    bannerImage
  });

  res.status(200).json({
    msg: 'Category updated.'
  });
};

exports.deleteCategory = async (req, res) => {
  const { name } = req.params;

  const productsInProvidedCategory = await Product.find({ category: name });

  if (productsInProvidedCategory !== null) {
    productsInProvidedCategory.forEach(async (product) => {
      await deleteProductFromAllCarts(product.id);
    });
  }

  await Product.deleteMany({ category: name });
  await Category.deleteOne({ name });

  res.status(200).json({
    msg: 'Category deleted.'
  });
};

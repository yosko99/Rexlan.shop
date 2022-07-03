const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const deleteProductFromAllCarts = require('./functions/cart/deleteProductFromAllCarts');
const updateProductCategory = require('./functions/category/updateProductCategory');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  res.status(200).json(req.category);
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
  const { name: newCategoryName, bannerImage } = req.body;

  await updateProductCategory(_id, newCategoryName);

  await Category.updateOne({ _id }, {
    name: newCategoryName,
    bannerImage
  });

  res.status(200).json({
    msg: 'Category updated.'
  });
};

exports.deleteCategory = async (req, res) => {
  const { _id } = req.params;

  const productsInProvidedCategory = await Product.find({ category: req.category.name });

  if (productsInProvidedCategory !== null) {
    productsInProvidedCategory.forEach(async (product) => {
      await deleteProductFromAllCarts(product.id);
    });
  }

  await Product.deleteMany({ category: req.category.name });
  await Category.deleteOne({ _id });

  res.status(200).json({
    msg: 'Category deleted.'
  });
};

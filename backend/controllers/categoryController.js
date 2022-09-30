const getCategoriesTranslation = require('./functions/category/getCategoriesTranslation');
const getCategoryTranslation = require('./functions/category/getCategoryTranslation');
const flushRedis = require('./functions/utils/flushRedis');

const deleteProductFromAllCarts = require('./functions/cart/deleteProductFromAllCarts');
const updateProductCategory = require('./functions/category/updateProductCategory');

const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const lang = require('../resources/lang');

exports.getCategories = async (req, res) => {
  let categories = await Category.find({});

  categories = await getCategoriesTranslation(req.currentLang, categories);

  res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  const category = await getCategoryTranslation(req.currentLang, req.category.name);

  res.status(200).json(category);
};

exports.createCategory = async (req, res) => {
  const { name, bannerImage } = req.body;

  const checkIfCategoryExists = await Category.findOne({ name });

  if (checkIfCategoryExists !== null) {
    return res.status(500).send(
      lang[req.currentLang].controllers.category.nameAlreadyExists
    );
  }

  await Category.create({
    name,
    bannerImage
  });

  await flushRedis();

  res.status(200).json({
    msg: lang[req.currentLang].controllers.category.categoryCreated
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

  await flushRedis();

  res.status(200).json({
    msg: lang[req.currentLang].controllers.category.categoryUpdated
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
  await flushRedis();

  res.status(200).json({
    msg: `${lang[req.currentLang].global.category} ${lang[req.currentLang].global.deleted.toLowerCase()}.`
  });
};

const Category = require('../models/categoryModel');

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

const Category = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
};

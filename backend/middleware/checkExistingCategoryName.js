const Category = require('../models/categoryModel');

const checkExstingCategoryName = async (req, res, next) => {
  const { name } = req.params;

  const checkExistingCategory = await Category.findOne({ name });

  if (checkExistingCategory === null) {
    return res.status(404).send('Category with provided name does not exists.');
  }

  next();
};

module.exports = checkExstingCategoryName;

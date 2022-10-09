const Category = require('../../models/categoryModel');
const mongoose = require('mongoose');

const checkExstingCategoryMiddleware = async (req, res, next) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Invalid id format.');
  }

  const checkExistingCategory = await Category.findOne({ _id }).select('-__v');

  if (checkExistingCategory === null) {
    return res.status(404).send('Category with provided name does not exists.');
  }

  req.category = checkExistingCategory;

  next();
};

module.exports = checkExstingCategoryMiddleware;

const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

const checkExstingCategory = async (req, res, next) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Invalid id format.');
  }

  const checkExistingCategory = await Category.findOne({ _id });

  if (checkExistingCategory === null) {
    return res.status(404).send('Category with provided name does not exists.');
  }

  next();
};

module.exports = checkExstingCategory;

const User = require('../../models/userModel');

const mongoose = require('mongoose');

const checkExistingUserMiddleware = async (req, res, next) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Invalid id format.');
  }

  const user = await User.findOne({ _id }).select('-createdAt -updatedAt -__v -cartID -password');

  if (user === null) {
    return res.status(404).send('Could not find user with provided email');
  }

  req.user = user;

  next();
};

module.exports = checkExistingUserMiddleware;

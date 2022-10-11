const Order = require('../../models/orderModel');

const mongoose = require('mongoose');

const checkExistingOrdersByUserMiddleware = async (req, res, next) => {
  const { userID } = req.params;

  if (userID === undefined || !mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).send('Invalid or not provided user ID');
  }
  const doesOrdersExist = await Order.find({ userID }).select('-__v -_id');

  if (doesOrdersExist === null) {
    return res.status(404).send('Invalid or not provided user ID');
  }

  req.orders = doesOrdersExist;

  next();
};

module.exports = checkExistingOrdersByUserMiddleware;

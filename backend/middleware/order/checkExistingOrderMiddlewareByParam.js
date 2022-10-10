const Order = require('../../models/orderModel');

const mongoose = require('mongoose');

const checkExistingOrderMiddlewareByParam = async (req, res, next) => {
  const { cartID } = req.params;

  if (cartID === undefined || !mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(404).send('Invalid or not provided cart ID');
  }
  const doesOrderExist = await Order.findOne({ cartID }).select('-__v -_id');

  if (doesOrderExist === null) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.order = doesOrderExist;

  next();
};

module.exports = checkExistingOrderMiddlewareByParam;

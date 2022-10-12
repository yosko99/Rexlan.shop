const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModel');

const mongoose = require('mongoose');

const checkExistingOrdersByUserMiddleware = async (req, res, next) => {
  const { cartID } = req.params;

  if (cartID === undefined || !mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(404).send('Invalid or not provided cart ID');
  }
  const cart = await Cart.findOne({ _id: cartID });

  const doesOrdersExist = await Order.find({
    userID: cart.userID
  }).where('orderStatus')
    .ne('Pending')
    .select('-__v -_id');

  if (doesOrdersExist === null || cart === null) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.orders = doesOrdersExist;

  next();
};

module.exports = checkExistingOrdersByUserMiddleware;

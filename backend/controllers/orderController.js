const Order = require('../models/orderModel');

const lang = require('../resources/lang');

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.orderInfo,
    cartID: req.body.cartID
  });

  res.status(200).json({
    orderID: order._id
  });
};

exports.getOrder = async (req, res) => {
  res.status(200).json(req.order);
};

exports.getUserOrders = async (req, res) => {
  res.status(200).json(req.orders);
};

exports.deleteOrder = async (req, res) => {
  await Order.deleteOne({ cartID: req.order.cartID });

  res.status(200).json({ msg: lang[req.currentLang].controllers.order.orderDeleted });
};

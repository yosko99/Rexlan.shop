const Order = require('../models/orderModel');

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

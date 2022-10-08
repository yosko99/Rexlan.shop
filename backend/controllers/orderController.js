const Order = require('../models/orderModel');

exports.createCart = async (req, res) => {
  const order = await Order.create({
    ...req.orderInfo,
    cartID: req.body.cartID
  });

  res.status(200).json({
    orderID: order._id
  });
};

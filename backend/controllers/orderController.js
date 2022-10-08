const Order = require('../models/orderModel');

exports.createCart = async (req, res) => {
  const {
    delivery,
    name,
    address,
    city,
    zipcode,
    phone,
    deliveryPrice
  } = req.body;

  const order = await Order.create({
    userID: req.currentCart.userID === undefined ? null : req.currentCart.userID,
    productsPrice: req.currentCart.totalPrice,
    products: req.currentCart.products,
    deliveryPrice: deliveryPrice,
    selectedCourier: delivery,
    cartID: req.body.cartID,
    zipcode,
    name,
    address,
    city,
    phone
  });

  res.status(200).json({
    orderID: order._id
  });
};

const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

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

  const userID = req.currentCart.userID;

  let newOrder = {
    productsPrice: req.currentCart.totalPrice,
    deliveryPrice: deliveryPrice,
    products: req.currentCart.products
  };

  if (req.currentCart.userID !== undefined) {
    newOrder = new Order({
      selectedCourier: delivery,
      userID: userID,
      ...newOrder
    });
  } else {
    newOrder = new Order({
      name,
      address,
      city,
      zipcode,
      phone,
      selectedCourier: delivery,
      ...newOrder
    });
  }

  await newOrder.save();
  await Cart.deleteOne({ _id: req.currentCart._id });

  res.status(200).json({
    newOrderID: newOrder._id
  });
};

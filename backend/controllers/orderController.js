const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const calculateCartTotalPrice = require('./functions/cart/calculateCartTotalPrice');

const lang = require('../resources/lang');

exports.createCart = async (req, res) => {
  const {
    cartID,
    delivery,
    name,
    address,
    city,
    zipcode,
    phone
  } = req.body;

  const user = await User.findOne({ cartID });
  let newOrder;

  if (user !== null) {
    newOrder = new Order({
      selectedCourier: delivery,
      userID: user._id
    });
  } else {
    newOrder = new Order({
      name,
      address,
      city,
      zipcode,
      phone,
      selectedCourier: delivery
    });
  }

  const { products: cartProducts } = await Cart.findOne({ _id: cartID });
  newOrder.totalPrice = await calculateCartTotalPrice(cartProducts);

  await newOrder.save();

  res.status(200).json({
    msg: lang[req.currentLang].controllers.order.orderCreated
  });
};

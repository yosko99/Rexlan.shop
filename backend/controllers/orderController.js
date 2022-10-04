const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

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

  if (user !== null) {
    const newOrder = new Order({
      selectedCourier: delivery,
      userID: user._id
    });
  } else {

  }
};

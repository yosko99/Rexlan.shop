const Cart = require('../../models/cartModel');

const mongoose = require('mongoose');

const checkPassedCartIDMiddleware = async (req, res, next) => {
  const { cartID } = req.body;

  const doesCartExist = await Cart.findOne({ _id: cartID });

  if (cartID === undefined || !mongoose.Types.ObjectId.isValid(doesCartExist)) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  const {
    delivery,
    name,
    address,
    city,
    zipcode,
    phone,
    deliveryPrice
  } = req.body;

  req.currentCart = doesCartExist;
  req.orderInfo = {
    userID: req.currentCart.userID === undefined ? null : req.currentCart.userID,
    productsPrice: req.currentCart.totalPrice,
    products: req.currentCart.products,
    selectedCourier: delivery,
    deliveryPrice,
    zipcode,
    address,
    name,
    city,
    phone
  };

  next();
};

module.exports = checkPassedCartIDMiddleware;

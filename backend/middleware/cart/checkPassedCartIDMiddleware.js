const Cart = require('../../models/cartModel');

const mongoose = require('mongoose');

const checkExistingOrderMiddlewareByParam = async (req, res, next) => {
  const { cartID } = req.params;

  if (cartID === undefined || !mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(404).send('Invalid or not provided cart ID');
  }
  const doesCartExist = await Cart.findOne({ _id: cartID }).select('-__v');

  if (doesCartExist === null) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.cart = doesCartExist;

  next();
};

module.exports = checkExistingOrderMiddlewareByParam;

const Cart = require('../models/cartModel');

const mongoose = require('mongoose');

const checkPassedCartIDMiddleware = async (req, res, next) => {
  const { cartID } = req.body;

  const doesCartExist = await Cart.findOne({ _id: cartID });

  if (cartID === undefined || !mongoose.Types.ObjectId.isValid(doesCartExist)) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.currentCart = doesCartExist;

  next();
};

module.exports = checkPassedCartIDMiddleware;

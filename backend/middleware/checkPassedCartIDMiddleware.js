const Cart = require('../models/cartModel');

const checkPassedCartIDMiddleware = async (req, res, next) => {
  const { cartID } = req.body;

  const doesCartExist = await Cart.findOne({ _id: cartID });

  if (cartID === undefined || !doesCartExist) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.currentCart = doesCartExist;

  next();
};

module.exports = checkPassedCartIDMiddleware;

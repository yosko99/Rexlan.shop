const User = require('../../models/userModel');
const Cart = require('../../models/cartModel');
const updateUserCart = require('./updateUserCart');
const createUserCart = require('./createUserCart');

const checkExistingCart = async (email, cartID) => {
  const checkCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  // First need to check if the user has already a cartID linked
  const currentUser = await User.findOne({ email });

  if (checkCart !== null) {
    return await updateUserCart(currentUser, cartID);
  } else {
    return await createUserCart(currentUser);
  }
};

module.exports = checkExistingCart;

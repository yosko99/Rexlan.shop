const Cart = require('../../../models/cartModel');

// This function is called when there is cartID saved in localStorage
const updateUserCart = async (user, cartID) => {
  // User does not have linked cartID
  if (user.cartID === undefined) {
    user.cartID = cartID;

    // Link cart with current user ID
    await Cart.updateOne({ _id: cartID }, {
      userID: user._id,
      isLinked: true
    });

    // Update user
    await user.save();
    return cartID;
  } else {
    // Customer already has linked cartID
    return user.cartID;
  }
};

module.exports = updateUserCart;

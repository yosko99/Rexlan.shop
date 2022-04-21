const User = require('../../models/userModel');
const Cart = require('../../models/cartModel');

const checkExistingCart = async (email, cartID) => {
  const checkCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  // First need to check if the user has already a cartID linked
  const currentUser = await User.findOne({ email });

  // There is a cart with provided ID
  if (checkCart !== null) {
    // User does not have linked cartID
    if (currentUser.cartID === undefined) {
      currentUser.cartID = cartID;

      // Link cart with current user ID
      await Cart.updateOne({ _id: cartID }, {
        userID: currentUser._id,
        isLinked: true
      });

      // Update user
      await currentUser.save();
      return cartID;
    } else {
      // Customer already has linked cartID
      return currentUser.cartID;
    }
  } else { // There is no cart with provided ID
    // Check if user has linked cart ID
    if (currentUser.cartID === undefined) {
      // Crete new cart for user
      const newCart = Cart({
        isLinked: true,
        userID: currentUser._id
      });

      const savedCart = await newCart.save();
      currentUser.cartID = savedCart._id;

      await currentUser.save();

      return savedCart._id;
    } else {
      return currentUser.cartID;
    }
  }
};

module.exports = checkExistingCart;

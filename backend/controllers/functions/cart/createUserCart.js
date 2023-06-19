const Cart = require('../../../models/cartModel');

// This function is called when there is no cartID saved in localStorage
const createUserCart = async (user) => {
  // Check if user has linked cart ID
  if (user.cartID === undefined) {
    // Crete new cart for user
    const newCart = Cart({
      isLinked: true,
      userID: user._id,
      totalPrice: 0
    });

    const savedCart = await newCart.save();
    user.cartID = savedCart._id;

    await user.save();

    return savedCart._id;
  } else {
    return user.cartID;
  }
};

module.exports = createUserCart;

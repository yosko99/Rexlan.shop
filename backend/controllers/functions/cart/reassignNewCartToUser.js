const Cart = require('../../../models/cartModel');
const User = require('../../../models/userModel');

const reassignNewCartToUser = async (userID) => {
  const newCart = await Cart({
    userID,
    isLinked: true
  }).save();

  await User.updateOne({ _id: userID }, {
    cartID: newCart._id
  });

  return newCart;
};

module.exports = reassignNewCartToUser;

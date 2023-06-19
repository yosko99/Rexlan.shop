const Cart = require('../../../models/cartModel');
const User = require('../../../models/userModel');

const reassignNewCartToUser = async (reassignCartToUser, userID) => {
  if (reassignCartToUser === 'true') {
    const newCart = await Cart({
      userID,
      isLinked: true
    }).save();

    await User.updateOne({ _id: userID }, {
      cartID: newCart._id
    });

    return newCart;
  } else {
    return {
      _id: null
    };
  }
};

module.exports = reassignNewCartToUser;

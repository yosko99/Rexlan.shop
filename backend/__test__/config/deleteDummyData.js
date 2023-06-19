const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const Cart = require('../../models/cartModel');

const deleteDummyData = async (dummyData) => {
  await Order.deleteOne({ cartID: dummyData.orderLinkedWithUser.cartID });

  await User.deleteMany({
    _id: [
      dummyData.userLinkedWithCart._id,
      dummyData.userNotLinkedWithCart._id
    ]
  });

  await Cart.deleteMany({
    _id: [
      dummyData.notLinkedCart._id,
      dummyData.linkedCart._id
    ]
  });
};

module.exports = deleteDummyData;

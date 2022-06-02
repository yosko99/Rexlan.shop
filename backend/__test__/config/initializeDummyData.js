const User = require('../../models/userModel');
const Cart = require('../../models/cartModel');

const bcrypt = require('bcryptjs');

const initializeDummyData = async (dummyData) => {
  const exampleProducts = {
    productID: '7',
    productQuantity: 1,
    _id: '6266d22b4ea2743a8f439148'
  };

  dummyData.notLinkedCart = await Cart({
    isLinked: false,
    products: [exampleProducts]
  }).save();

  dummyData.linkedCart = await Cart({
    isLinked: true,
    products: [exampleProducts]
  }).save();

  const hashedPassword = bcrypt.hashSync('testing', 1);

  dummyData.userLinkedWithCart = await User({
    email: 'test@test.gmail',
    password: hashedPassword,
    name: 'test',
    address: 'test',
    phone: 'test'
  }).save();

  dummyData.userNotLinkedWithCart = await User({
    email: 'test2@test.bg',
    password: hashedPassword,
    name: 'test2',
    address: 'test2',
    phone: 'test2'
  }).save();

  dummyData.linkedCart.userID = dummyData.userLinkedWithCart._id;
  dummyData.userLinkedWithCart.cartID = dummyData.linkedCart._id;

  await dummyData.linkedCart.save();
  await dummyData.userLinkedWithCart.save();

  return dummyData;
};

module.exports = initializeDummyData;

const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const calculateCartTotalPrice = require('./functions/cart/calculateCartTotalPrice');
const reassignNewCartToUser = require('./functions/cart/reassignNewCartToUser');
const updateOrderStatus = require('./functions/cart/updateOrderStatus');

const lang = require('../resources/lang');

const mongoose = require('mongoose');

exports.addProductToCart = async (req, res) => {
  const { productID, cartID, productQuantity: bodyProductQuantity } = req.body;

  const productQuantity = bodyProductQuantity !== undefined ? Number(bodyProductQuantity) : 1;

  let currentCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  if (productID === undefined) {
    return res.status(404).send(lang[req.currentLang].global.noProductID);
  }

  // Check if cart with provdided id exists
  // If a cart exists check if the product exists in the cart
  // Otherwise create new cart and assign the new prodcut

  if (currentCart !== null) {
    // Check if item is already in cart
    const product = currentCart.products.find((product) => (
      product.productID === productID
    ));

    // Already in cart (increment quantity)
    if (product !== undefined) {
      product.productQuantity += productQuantity;
    } else { // Add new item to cart
      currentCart.products.push({
        productID,
        productQuantity
      });
    }
    currentCart.totalPrice = await calculateCartTotalPrice(currentCart.products);
    currentCart = await currentCart.save();

    return res.status(200).send({
      cartID: currentCart._id
    });
  } else {
    try {
      const addedProduct = await Product.findOne({ id: productID });

      const newCart = new Cart({
        isLinked: false,
        products: [{
          productID,
          productQuantity
        }],
        totalPrice: addedProduct.price * productQuantity
      });

      const savedCart = await newCart.save();

      return res.status(200).json({
        cartID: savedCart._id
      });
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
};

exports.getCart = (req, res) => {
  res.status(200).json(req.cart);
};

exports.getCartProducts = async (req, res) => {
  const { cartID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(200).json({
      err: lang[req.currentLang].controllers.cart.invalidCartID
    });
  };

  const cart = await Cart.findOne({ _id: cartID });

  // Check if there are products in cart
  if (cart.products.length === 0) {
    return res.status(200).json({
      err: lang[req.currentLang].controllers.cart.noItemsInCart
    });
  }

  // Cart is not linked to user (cart is anonymous)
  if (!cart.isLinked) {
    return res.status(200).json({
      products: cart.products,
      defaultValues: null
    });
  } else { // Cart is linked to user
    const userID = cart.userID;
    const user = await User.findOne({ _id: userID });
    const { phone, address, name, zipcode } = user;

    // Send user details and cart items
    return res.status(200).json({
      products: cart.products,
      defaultValues: {
        phone,
        address,
        name,
        zipcode
      }
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  const { cartID, productID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(404).send(
      lang[req.currentLang].controllers.cart.invalidCartID
    );
  }

  const cart = await Cart.findOne({ _id: cartID });

  if (cart === null) {
    return res.status(404).send(
      lang[req.currentLang].controllers.cart.invalidCartID
    );
  }

  const productsWithRemovedProduct = [];

  cart.products.forEach((product) => {
    if (product.productID === productID) {
      // Decrement quantity
      if (product.productQuantity > 1) {
        product.productQuantity--;
        productsWithRemovedProduct.push(product);
      }
    } else {
      productsWithRemovedProduct.push(product);
    }
  });

  cart.products = productsWithRemovedProduct;
  cart.totalPrice = await calculateCartTotalPrice(cart.products);

  await cart.save();

  return res.status(200).json({
    msg: `${lang[req.currentLang].global.product} ${lang[req.currentLang].global.removed.toLowerCase()}`
  });
};

exports.deleteCart = async (req, res) => {
  const newCart = await reassignNewCartToUser(req.query.reassignCartToUser, req.cart.userID);
  await updateOrderStatus(req.cart._id);

  await Cart.deleteOne({ _id: req.cart._id });

  res.status(200).json({
    msg: lang[req.currentLang].controllers.cart.cartDeleted,
    cartID: newCart._id
  });
};

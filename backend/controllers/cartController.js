const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const mongoose = require('mongoose');

exports.addProductToCart = async (req, res) => {
  const { productID, cartID, productQuantity: bodyProductQuantity } = req.body;

  const productQuantity = bodyProductQuantity !== undefined ? Number(bodyProductQuantity) : 1;

  const checkCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  if (productID === undefined) {
    return res.status(404).send('No product ID provided');
  }

  // Check if cart with provdided id exists
  // If a cart exists check if the product exists in the cart
  // Otherwsie create new cart and assign the new prodcut

  if (checkCart !== null) {
    let updatedCart;

    // Check if item is already in cart
    const product = checkCart.products.find((product) => (
      product.productID === productID
    ));

    // Already in cart (increment quantity)
    if (product !== undefined) {
      product.productQuantity += productQuantity;
      updatedCart = await checkCart.save();
    } else { // Add new item to cart
      checkCart.products.push({
        productID,
        productQuantity
      });
      updatedCart = await checkCart.save();
    }
    return res.status(200).send({
      cartID: updatedCart._id
    });
  } else {
    try {
      const newCart = new Cart({
        isLinked: false,
        products: [{
          productID,
          productQuantity
        }]
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

exports.getCart = async (req, res) => {
  const { cartID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartID)) {
    return res.status(200).json({
      err: 'Invalid cart ID'
    });
  };

  const cart = await Cart.findOne({ _id: cartID });

  // Check if there are products in cart
  if (cart.products.length === 0) {
    return res.status(200).json({
      err: 'No items in cart'
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
    const { phone, address, name } = user;

    // Send user details and cart items
    return res.status(200).json({
      products: cart.products,
      defaultValues: {
        phone,
        address,
        name
      }
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  const { cartID, productID } = req.body;
  const cart = await Cart.findOne({ _id: cartID });

  if (cart === null) {
    return res.status(404).send('Invalid cart ID');
  }

  const filteredProducts = [];

  cart.products.forEach((product) => {
    if (product.productID === productID) {
      // Decrement quantity
      if (product.productQuantity > 1) {
        product.productQuantity--;
        filteredProducts.push(product);
      }
    } else {
      filteredProducts.push(product);
    }
  });

  cart.products = filteredProducts;
  await cart.save();

  return res.status(200).json({
    msg: 'Product removed'
  });
};

const Cart = require('../models/cartModel');
const User = require('../models/userModel');

exports.addProductToCart = async (req, res) => {
  const productID = req.body.productID;
  const cartID = req.body.cartID;

  const checkCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  // Check if cart with provdided id exists
  // If exists check if the prodcuts exists in the cart
  // Otherwsie create new cart and assign the new prodcut

  if (checkCart !== null) {
    // Check if item is already in cart
    let savedCart;

    const product = checkCart.products.find((product) => (
      product.productID === productID
    ));

    // Already in cart (increment quantity)
    if (product !== undefined) {
      product.productQuantity++;
      savedCart = await checkCart.save();
    } else { // Add new item to cart
      checkCart.products.push({
        productID,
        productQuantity: 1
      });
      savedCart = await checkCart.save();
    }
    return res.status(200).send({
      cartID: savedCart._id
    });
  } else {
    try {
      const newCart = new Cart({
        isLinked: false,
        products: [{
          productID,
          productQuantity: 1
        }]
      });

      const savedCart = await newCart.save();

      return res.status(200).json({
        cartID: savedCart._id
      });
    } catch (error) {
      return res.status(404).json({
        msg: error.message
      });
    }
  }
};

exports.getCart = async (req, res) => {
  const { cartID } = req.params;

  // No cart id provided
  if (cartID === 'null') {
    return res.status(200).json({
      err: 'No items in cart'
    });
  }

  const cart = await Cart.findOne({ _id: cartID });

  // Cart id provided but not products in cart
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
    return res.status(404).json({
      msg: 'Cant find cart with provided ID'
    });
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

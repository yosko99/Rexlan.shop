const Cart = require('../models/cartModel');

exports.addCart = async (req, res) => {
  const productID = req.body.productID;
  const cartID = req.body.cartID;

  const checkCart = (cartID !== null) ? await Cart.findOne({ _id: cartID }) : null;

  // Check if cart with provdided id exists
  // If exists check if the prodcuts exists in the cart
  // Otherwsie create new cart and assign the new prodcut

  if (checkCart !== null) {
    // Check if item is already in cart
    let savedCart;

    const incrementQuantity = checkCart.products.find((product) => (
      product.productID === productID
    ));

    // Already in cart (increment quantity)
    if (incrementQuantity !== undefined) {
      incrementQuantity.productQuantity++;
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

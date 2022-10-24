const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const checkPassedCartIDMiddleware = require('../middleware/cart/checkPassedCartIDMiddleware');

const cartController = require('../controllers/cartController');

// Question marks in front of 'accept' variables means that they are not required

// @desc Add or update (increment) product in cart
// @route POST /api/carts/
// @access Public
// @accepts { productID, cartID, productQuantity? }
router.post('/', asyncHandler(cartController.addProductToCart));

// @desc Get cart info
// @route GET /api/carts/:cartID
// @access Public
router.get('/:cartID', checkPassedCartIDMiddleware, asyncHandler(cartController.getCart));

// @desc Fetch the products of cart if there are any
// @route GET /api/carts/products/:cartID
// @access Public
router.get('/products/:cartID', asyncHandler(cartController.getCartProducts));

// @desc Delete/decrement product from cart
// @route PUT /api/carts/products
// @access Public
// @accepts { cartID, productID }
router.put('/products', asyncHandler(cartController.deleteProductFromCart));

// @desc Delete a cart with optional reassign new cart to user value
// @route DELETE /api/carts/:cartID?reassignCartToUser=(true/false)
// @access Public
router.delete('/:cartID', checkPassedCartIDMiddleware, asyncHandler(cartController.deleteCart));

module.exports = router;

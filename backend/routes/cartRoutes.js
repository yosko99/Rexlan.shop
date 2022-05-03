const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// Question marks in front of 'accept' variables means that they are not required

// @desc Add or update (increment) product in cart
// @route POST /api/carts/
// @access Public
// @accepts { productID, cartID, productQuantity? }
router.post('/', asyncHandler(cartController.addProductToCart));

// @desc Fetch the products of cart if there are any
// @route GET /api/carts/:cartID
// @access Public
router.get('/:cartID', asyncHandler(cartController.getCart));

// @desc Delete/decrement product from cart
// @route DELETE /api/carts/product
// @access Public
// @accepts { cartID, productID }
router.delete('/product', asyncHandler(cartController.deleteProductFromCart));

module.exports = router;

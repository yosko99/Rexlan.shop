const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// @desc Add or update (increment) product to cart
// @route POST /api/carts/
// @access Public
router.post('/', asyncHandler(cartController.addCart));

// @desc Fetch the products of cart if there are any
// @route GET /api/carts/:cartID
// @access Public
router.get('/:cartID', asyncHandler(cartController.getCart));

module.exports = router;

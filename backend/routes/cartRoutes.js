const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// @desc Add or update (increment) product to cart
// @route POST /api/carts/
// @access Public
router.post('/', asyncHandler(cartController.addCart));

module.exports = router;

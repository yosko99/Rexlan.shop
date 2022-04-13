const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// @desc Fetch all products
// @route GET /api/products/
// @access Public
router.get('/', asyncHandler(productController.getProducts));

module.exports = router;

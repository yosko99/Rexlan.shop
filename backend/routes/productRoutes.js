const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// @desc Fetch all products
// @route GET /api/products/
// @access Public
router.get('/', asyncHandler(productController.getProducts));

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get('/:id', asyncHandler(productController.getProduct));

module.exports = router;

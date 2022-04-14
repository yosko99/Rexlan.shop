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

// @desc Fetch products by category
// @route GET /api/products/category/:category
// @access Public
router.get('/category/:category', asyncHandler(productController.getProductsByCategory));

// @desc Fetch products sorted by passed attribute
// @route GET /api/products/sort/:attribute
// @access Public
router.get('/sort/:attribute', asyncHandler(productController.getProductsSortedBy));

module.exports = router;

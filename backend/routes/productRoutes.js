const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const checkValidProductID = require('../middleware/checkValidProductID');

// @desc Fetch all products with optional quantity value
// @route GET /api/products?qty=2
// @access Public
router.get('/', asyncHandler(productController.getProducts));

// @desc Update product
// @route PUT /api/products/:id
// @access Public
// @accepts { title, price, description, category, image }
router.put('/:id', checkValidProductID, asyncHandler(productController.updateProduct));

// @desc Deletes a product with provided product ID
// @route DELETE /api/products/:id
// @access Public
router.delete('/:id', checkValidProductID, asyncHandler(productController.deleteProduct));

// @desc Creates a product
// @route POST /api/products/
// @access Public
// @accepts { title, price, description, category, image }
router.post('/', asyncHandler(productController.createProduct));

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get('/:id', asyncHandler(productController.getProduct));

// @desc Fetch products by category with optional quantity value
// @route GET /api/products/category/:category?qty=2
// @access Public
router.get('/category/:category', asyncHandler(productController.getProductsByCategory));

// @desc Fetch products sorted by passed attribute with optional quantity value
// @route GET /api/products/sort/:attribute?qty=2
// @access Public
router.get('/sort/:attribute', asyncHandler(productController.getProductsSortedBy));

// @desc Fetch 4 products with provided query string
// @route GET /api/products/regex/:pattern
// @access Public
router.get('/regex/:pattern', asyncHandler(productController.getProductsByQueryString));

module.exports = router;

const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// @desc Fetch all categories
// @route GET /api/categories/
// @access Public
router.get('/', asyncHandler(categoryController.getCategories));

// @desc Create new category
// @route POST /api/categories/
// @access Public
// @accepts { name, bannerImage }
router.post('/', asyncHandler(categoryController.createCategory));

// @desc Update a category
// @route PUT /api/categories/
// @access Public
// @accepts { name, bannerImage }
router.put('/:name', asyncHandler(categoryController.updateCategory));

module.exports = router;

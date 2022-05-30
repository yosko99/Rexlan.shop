const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const checkExstingCategoryName = require('../middleware/checkExistingCategoryName');

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
// @route PUT /api/categories/:name
// @access Public
// @accepts { name, bannerImage }
router.put('/:name', checkExstingCategoryName, asyncHandler(categoryController.updateCategory));

// @desc Delete a category and all related products
// @route DELETE /api/categories/:name
// @access Public
router.delete('/:name', checkExstingCategoryName, asyncHandler(categoryController.deleteCategory));

module.exports = router;

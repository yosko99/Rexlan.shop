const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const checkExstingCategory = require('../middleware/checkExistingCategory');

// @desc Fetch all categories
// @route GET /api/categories/
// @access Public
router.get('/', asyncHandler(categoryController.getCategories));

// @desc Get one category
// @route GET /api/categories/:_id
// @access Public
router.get('/:_id', checkExstingCategory, asyncHandler(categoryController.getCategory));

// @desc Create new category
// @route POST /api/categories/
// @access Public
// @accepts { name, bannerImage }
router.post('/', asyncHandler(categoryController.createCategory));

// @desc Update a category
// @route PUT /api/categories/:_id
// @access Public
// @accepts { name, bannerImage }
router.put('/:_id', checkExstingCategory, asyncHandler(categoryController.updateCategory));

// @desc Delete a category and all related products
// @route DELETE /api/categories/:_id
// @access Public
router.delete('/:_id', checkExstingCategory, asyncHandler(categoryController.deleteCategory));

module.exports = router;

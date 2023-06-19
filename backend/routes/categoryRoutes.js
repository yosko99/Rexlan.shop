const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

const checkExstingCategoryMiddleware = require('../middleware/category/checkExistingCategoryMiddleware');

// @desc Fetch all categories
// @route GET /api/categories/
// @access Public
router.get('/', asyncHandler(categoryController.getCategories));

// @desc Get one category
// @route GET /api/categories/:_id
// @access Public
router.get('/:_id', checkExstingCategoryMiddleware, asyncHandler(categoryController.getCategory));

// @desc Create new category
// @route POST /api/categories/
// @access Public
// @accepts { name, bannerImage }
router.post('/', asyncHandler(categoryController.createCategory));

// @desc Update a category
// @route PUT /api/categories/:_id
// @access Public
// @accepts { name, bannerImage }
router.put('/:_id', checkExstingCategoryMiddleware, asyncHandler(categoryController.updateCategory));

// @desc Delete a category and all related products
// @route DELETE /api/categories/:_id
// @access Public
router.delete('/:_id', checkExstingCategoryMiddleware, asyncHandler(categoryController.deleteCategory));

module.exports = router;

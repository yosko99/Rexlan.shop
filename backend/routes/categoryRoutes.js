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
// @accepts { name, category }
router.post('/', asyncHandler(categoryController.createCategory));

module.exports = router;

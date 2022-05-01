const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// @desc Fetch all user data
// @route GET /api/users/
// @access Public
router.get('/', asyncHandler(userController.getUsers));

// @desc Add a new user
// @route POST /api/users/
// @access Public
router.post('/', asyncHandler(userController.addUser));

// @desc Login a user
// @route POST /api/users/login
// @access Public
router.post('/login', asyncHandler(userController.loginUser));

// @desc Password reset
// @route POST /api/users/password-reset
// @access Public
router.post('/password-reset', asyncHandler(userController.resetPassword));

module.exports = router;

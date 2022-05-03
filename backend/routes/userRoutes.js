const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Question marks in front of 'accept' variables means that they are not required

// @desc Fetch all user data
// @route GET /api/users/
// @access Public
router.get('/', asyncHandler(userController.getUsers));

// @desc Add a new user
// @route POST /api/users/
// @access Public
// @accepts { email, name, password, address, phone, cartID? }
router.post('/', asyncHandler(userController.addUser));

// @desc Login a user
// @route POST /api/users/login
// @access Public
// @accepts { email, password, cartID }
router.post('/login', asyncHandler(userController.loginUser));

// @desc Password reset
// @route POST /api/users/password-reset
// @access Public
// @accepts { email }
router.post('/password-reset', asyncHandler(userController.resetPassword));

module.exports = router;

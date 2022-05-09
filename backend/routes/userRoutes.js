const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

// Question marks in front of 'accept' variables means that they are not required

// @desc Fetch all user data
// @route GET /api/users/
// @access Public
router.get('/', asyncHandler(userController.getUsers));

// @desc Get current user data
// @route GET /api/users/current
// @access Public
// @requires [authorization] header with JWT token
router.get('/current', verifyJWT, asyncHandler(userController.getCurrentUser));

// @desc Update current user data
// @route POST /api/users/current
// @access Public
// @requires [authorization] header with JWT token
// @accepts { email, name, address, phone, zip }
router.post('/current', verifyJWT, asyncHandler(userController.updateCurrentUser));

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

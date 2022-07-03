const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const checkExistingUserMiddleware = require('../middleware/checkExistingUserMiddleware');
const verifyJWT = require('../middleware/verifyJWTMiddleware');

// Question marks in front of 'accept' variables means that they are not required
// Difference between 'current user' and 'user' is that one requires JWT for access and the other uses _id

// @desc Fetch all user data
// @route GET /api/users/
// @access Public
router.get('/', asyncHandler(userController.getUsers));

// @desc Add a new user
// @route POST /api/users/
// @access Public
// @optional [ sendtokenback ] header
// @accepts { email, name, password, address, phone, cartID? }
router.post('/', asyncHandler(userController.addUser));

// @desc Get user data
// @route GET /api/users/user/:_id
// @access Public
router.get('/user/:_id', checkExistingUserMiddleware, asyncHandler(userController.getUser));

// @desc Update user data
// @route PUT /api/users/user/:_id
// @access Public
// @accepts { email, name, address, phone, zip, isAdmin? }
router.put('/user/:_id', checkExistingUserMiddleware, asyncHandler(userController.updateUser));

// @desc Delete user
// @route DELETE /api/users/user/:_id
// @access Public
router.delete('/user/:_id', checkExistingUserMiddleware, asyncHandler(userController.deleteUser));

// @desc Get current user data
// @route GET /api/users/current
// @access Public
// @requires [ authorization ] header with JWT token
router.get('/current', verifyJWT, asyncHandler(userController.getCurrentUser));

// @desc Update current user data
// @route PUT /api/users/current
// @access Public
// @requires [ authorization ] header with JWT token
// @accepts { name, address, phone, zip }
router.put('/current', verifyJWT, asyncHandler(userController.updateCurrentUser));

// @desc Change user password
// @route POST /api/users/change-password
// @access Public
// @requires [ authorization ] header with JWT token
// @accepts { oldPassword, newPassword }
router.post('/change-password', verifyJWT, asyncHandler(userController.changePassword));

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

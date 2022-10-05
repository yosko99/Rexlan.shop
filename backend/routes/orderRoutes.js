const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

// Question marks in front of 'accept' variables means that they are not required

// @desc Creates a new order
// @route POST /api/orders/
// @access Public
// @accept { userID?, selectedCourier, name?, address?, city?, zipcode?, phone? }
router.post('/', asyncHandler(orderController.createCart));

module.exports = router;

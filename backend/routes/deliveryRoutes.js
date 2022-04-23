const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const deliveryController = require('../controllers/deliveryController');

// @desc Fetch all delivery methods
// @route GET /api/deliveries/
// @access Public
router.get('/', asyncHandler(deliveryController.getDeliveries));

module.exports = router;

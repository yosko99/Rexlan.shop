const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const checkPassedCartIDMiddleware = require('../middleware/order/checkPassedCartIDMiddleware');
const checkExistingOrderMiddleware = require('../middleware/order/checkExistingOrderMIddleware');

// Question marks in front of 'accept' variables means that they are not required

// @desc Creates a new order
// @route POST /api/orders/
// @access Public
// @accept { cartID, selectedCourier, deliveryPrice, userID?, name?, address?, city?, zipcode?, phone? }
router.post(
  '/',
  checkPassedCartIDMiddleware,
  checkExistingOrderMiddleware,
  asyncHandler(orderController.createCart)
);

module.exports = router;

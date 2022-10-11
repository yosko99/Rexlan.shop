const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const checkPassedCartIDMiddleware = require('../middleware/order/checkPassedCartIDMiddleware');
const checkExistingOrderMiddleware = require('../middleware/order/checkExistingOrderMIddleware');
const checkExistingOrderByOrderIDMiddleware = require('../middleware/order/checkExistingOrderByOrderIDMiddleware');
const checkExistingOrdersByUserIDMiddleware = require('../middleware/order/checkExistingOrdersByUserIDMiddleware');

// Question marks in front of 'accept' variables means that they are not required

// @desc Creates a new order
// @route POST /api/orders/
// @access Public
// @accept { cartID, selectedCourier, deliveryPrice, userID?, name?, address?, city?, zipcode?, phone? }
router.post(
  '/',
  checkPassedCartIDMiddleware,
  checkExistingOrderMiddleware,
  asyncHandler(orderController.createOrder)
);

// @desc Fetch single order by cartID
// @route GET /api/orders/cart/:cartID
// @access Public
router.get('/cart/:cartID', checkExistingOrderByOrderIDMiddleware, asyncHandler(orderController.getOrderByOrder));

// @desc Fetch all orders by userID
// @route GET /api/orders/user/:userID
// @access Public
router.get('/user/:userID', checkExistingOrdersByUserIDMiddleware, asyncHandler(orderController.getOrderByUser));

// @desc Deletes a order
// @route DELETE /api/orders/:cartID
// @access Public
router.delete('/:cartID', checkExistingOrderByOrderIDMiddleware, asyncHandler(orderController.deleteOrder));

module.exports = router;

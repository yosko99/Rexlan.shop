const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const checkPassedCartIDMiddleware = require('../middleware/order/checkPassedCartIDMiddleware');
const checkExistingOrderMiddleware = require('../middleware/order/checkExistingOrderMIddleware');
const checkExistingOrderByCartIDMiddleware = require('../middleware/order/checkExistingOrderByCartIDMiddleware');
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
// @route GET /api/orders/:cartID
// @access Public
router.get('/:cartID', checkExistingOrderByCartIDMiddleware, asyncHandler(orderController.getOrder));

// @desc Fetch all user orders by cartID
// @route GET /api/orders/user/:cartID
// @access Public
router.get('/user/:cartID', checkExistingOrdersByUserIDMiddleware, asyncHandler(orderController.getUserOrders));

// @desc Deletes a order
// @route DELETE /api/orders/:cartID
// @access Public
router.delete('/:cartID', checkExistingOrderByCartIDMiddleware, asyncHandler(orderController.deleteOrder));

module.exports = router;

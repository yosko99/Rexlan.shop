const Order = require('../../models/orderModel');

const checkExistingOrderMiddlewareByParam = async (req, res, next) => {
  const { cartID } = req.params;

  const doesOrderExist = await Order.findOne({ cartID }).select('-__v -_id');

  if (cartID === undefined || doesOrderExist === null) {
    return res.status(404).send('Invalid or not provided cart ID');
  }

  req.order = doesOrderExist;

  next();
};

module.exports = checkExistingOrderMiddlewareByParam;

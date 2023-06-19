const Order = require('../../models/orderModel');

const checkExistingOrderMiddleware = async (req, res, next) => {
  const { cartID } = req.body;
  const doesOrderExist = await Order.findOne({ cartID });

  if (doesOrderExist !== null) {
    await Order.updateOne({ cartID }, { ...req.orderInfo });

    return res.status(200).json({
      orderID: doesOrderExist._id
    });
  }

  next();
};

module.exports = checkExistingOrderMiddleware;

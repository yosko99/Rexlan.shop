const Order = require('../../../models/orderModel');

const updateOrderStatus = async (cartID) => {
  const order = await Order.findOne({ cartID });

  if (order !== null) {
    order.orderStatus = 'Processing';
    await order.save();
  }
};

module.exports = updateOrderStatus;

const Order = require('../models/orderModel');

const checkExistingOrderMiddleware = async (req, res, next) => {
  const { cartID } = req.body;
  const doesOrderExist = await Order.findOne({ cartID });

  if (doesOrderExist !== null) {
    const {
      delivery,
      name,
      address,
      city,
      zipcode,
      phone,
      deliveryPrice
    } = req.body;

    await Order.updateOne({ cartID }, {
      products: req.currentCart.products,
      selectedCourier: delivery,
      productsPrice: req.currentCart.totalPrice,
      deliveryPrice,
      zipcode,
      name,
      address,
      city,
      phone
    });

    return res.status(200).json({
      orderID: doesOrderExist._id
    });
  }

  next();
};

module.exports = checkExistingOrderMiddleware;

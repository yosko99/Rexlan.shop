const Delivery = require('../models/deliveryModel');

exports.getDeliveries = async (req, res) => {
  const deliveries = await Delivery.find({});

  if (deliveries === null) {
    return res.status(404).send('No data');
  }
  return res.status(200).json(deliveries);
};

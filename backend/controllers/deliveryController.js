const Delivery = require('../models/deliveryModel');

const lang = require('../resources/lang');

exports.getDeliveries = async (req, res) => {
  const deliveries = await Delivery.find({});

  if (deliveries === null) {
    return res.status(404).send(lang[req.currentLang].global.noData);
  }
  return res.status(200).json(deliveries);
};

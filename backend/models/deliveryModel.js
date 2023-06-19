const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = Schema({
  title: {
    type: String,
    required: true
  },
  initialPrice: {
    type: Number,
    required: true
  },
  priceToAddress: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;

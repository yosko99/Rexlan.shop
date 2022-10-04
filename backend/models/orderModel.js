const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: false
  },
  orderStatus: {
    type: String,
    enum: ['Pending Approval', 'Processing', 'Delivered'],
    default: 'Pending Approval',
    required: true
  },
  selectedCourier: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  zipcode: {
    type: Number,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

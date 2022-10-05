const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
  userID: {
    type: Schema.Types.ObjectId
  },
  orderStatus: {
    type: String,
    enum: ['Pending Approval', 'Processing', 'Delivered'],
    default: 'Pending Approval'
  },
  selectedCourier: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  zipcode: {
    type: Number
  },
  phone: {
    type: String
  },
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

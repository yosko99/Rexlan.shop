const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
  productID: {
    type: String
  },
  productQuantity: {
    type: Number
  }
}, {
  _id: false
});

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
  productsPrice: {
    type: Number,
    default: 0
  },
  deliveryPrice: {
    type: Number,
    default: 0
  },
  products: {
    type: [ProductsSchema]
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

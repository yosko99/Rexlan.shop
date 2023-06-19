const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartShema = Schema({
  products: {
    type: [{
      productID: {
        type: String,
        required: true
      },
      productQuantity: {
        type: Number,
        required: true
      }
    }]
  },
  isLinked: {
    type: Boolean,
    required: true
  },
  userID: {
    type: String
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0
  }

});

const Cart = mongoose.model('Cart', cartShema);

module.exports = Cart;

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
  }

});

const Cart = mongoose.model('Cart', cartShema);

module.exports = Cart;

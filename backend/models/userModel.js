const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cartID: {
    type: String
  },
  zipcode: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

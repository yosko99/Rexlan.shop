const User = require('../models/userModel');

const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');

  res.status(200).json(users);
};

exports.addUser = async (req, res) => {
  const { email, name, password, address } = req.body;

  const checkRegistered = await User.findOne({ email });

  if (checkRegistered !== null) {
    return res.status(403).send('Already registered');
  }
  bcrypt.hash(password, Number(process.env.SALT_ROUNDS), function (err, hash) {
    if (err) {
      return res.status(404).send(err);
    }
    const newUser = User({
      email,
      password: hash,
      name,
      address
    });
    newUser.save((err) => {
      if (err) {
        return res.status(404).send(err);
      }
    });
  });
  res.status(200).send('User created');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    return res.status(401).send('User not found');
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(404).send(err);
    }

    res.status(200).send(result);
  });
};

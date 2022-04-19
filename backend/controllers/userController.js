const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
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
    return res.status(403).json({
      msg: 'User with this email already exists.'
    });
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
      } else {
        const token = jwt.sign({
          email,
          password
        }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
          msg: 'Your account has been successfully created.',
          token
        });
      }
    });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    return res.status(403).send({
      msg: 'User with this email does not exist.'
    });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(404).send(err);
    }

    if (result) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        msg: 'You Have Successfully Logged in.',
        token
      });
    }

    res.status(403).json({
      msg: 'Password does not match registered email.'
    });
  });
};

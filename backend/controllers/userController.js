const checkExistingCart = require('./functions/cart/checkExistingCart');
const generateChars = require('./functions/utils/generateChars');
const updateUser = require('./functions/user/updateUser');

const createEmailMessage = require('../config/createEmailMessage');
const createTransporter = require('../config/createTransporter');

const User = require('../models/userModel');
const Cart = require('../models/cartModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const lang = require('../resources/lang');

exports.getUsers = async (req, res) => {
  const users = await User
    .find({})
    .select('-password');

  res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  res.status(200).json(req.user);
};

exports.getCurrentUser = async (req, res) => {
  const user = await User
    .findOne({ email: req.user.email })
    .select('-password');

  res.status(200).json({ user });
};

exports.updateUser = async (req, res) => {
  updateUser(req, res);
};

exports.updateCurrentUser = async (req, res) => {
  updateUser(req, res);
};

exports.deleteUser = async (req, res) => {
  await Cart.deleteOne({ userID: req.user._id });
  await User.deleteOne({ _id: req.user._id });

  res.status(200).json({
    msg: lang[req.currentLang].controllers.user.userDeleted
  });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email: req.user.email });

  bcrypt.compare(oldPassword, user.password, async function (err, result) {
    if (err) {
      return res.status(404).send(err);
    }
    // Password match
    if (result) {
      bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS), async function (_err, hashedPassword) {
        user.password = hashedPassword;

        await user.save();
        return res.status(200).json({
          msg: lang[req.currentLang].controllers.user.passwordUpdated
        });
      });
    } else {
      // Password mismatch
      return res.status(403).send(
        lang[req.currentLang].controllers.user.passwordMismatch
      );
    }
  });
};

exports.addUser = async (req, res) => {
  const {
    email,
    name,
    password,
    address,
    phone,
    cartID,
    isAdmin
  } = req.body;

  const checkRegistered = await User.findOne({ email });

  // Email is already registered
  if (checkRegistered !== null) {
    return res.status(403).send(
      lang[req.currentLang].controllers.user.userWithEmailAlreadyExists
    );
  }
  // Hash the password
  bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async function (err, hashedPassword) {
    if (err) {
      return res.status(404).send(err);
    }

    await User.create({
      email,
      password: hashedPassword,
      name,
      address,
      phone,
      isAdmin
    });

    // Create new user from register page
    if (req.headers.sendtokenback === 'true') {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

      const checkedCartID = await checkExistingCart(email, cartID);

      return res.status(200).json({
        msg: lang[req.currentLang].controllers.user.accountCreated,
        token,
        cartID: checkedCartID
      });
    }

    // Create new user from admin panel
    res.status(200).json({
      msg: lang[req.currentLang].controllers.user.userCreated
    });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password, cartID } = req.body;

  const user = await User.findOne({ email });

  // Provided not registered email
  if (user === null) {
    return res.status(403).send(
      lang[req.currentLang].controllers.user.userWithEmailDoesNotExist
    );
  }
  bcrypt.compare(password, user.password, async function (err, result) {
    if (err) {
      return res.status(404).send(err);
    }

    // Password match
    if (result) {
      const checkedCartID = await checkExistingCart(email, cartID);

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        msg: lang[req.currentLang].controllers.user.loggedIn,
        token,
        cartID: checkedCartID
      });
    }

    // Password mismatch
    res.status(403).send(
      lang[req.currentLang].controllers.user.passwordMismatch
    );
  });
};

exports.resetPassword = async (req, res) => {
  // Optimistic update when no sender email is set up
  if (process.env.SENDER_EMAIL === undefined) {
    return res.status(200).json({
      msg: lang[req.currentLang].controllers.user.checkMailForPassword
    });
  }

  const { email: recieverEmail } = req.body;
  const user = await User.findOne({ email: recieverEmail });

  // This email is not used in registration or email is missing
  if (recieverEmail === undefined || user === null) {
    return res.status(404).send(
      lang[req.currentLang].controllers.user.couldNotFindEmail
    );
  }

  const temporaryPassword = generateChars(10);
  const hashedPassword = bcrypt.hashSync(temporaryPassword, Number(process.env.SALT_ROUNDS));

  await User.updateOne({ email: recieverEmail }, {
    password: hashedPassword
  });

  const transporter = createTransporter();
  const emailMessage = createEmailMessage(recieverEmail, temporaryPassword);

  transporter.sendMail(emailMessage, (err, info) => {
    if (err) {
      return res.status(404).send(err);
    }

    return res.status(200).json({
      msg: lang[req.currentLang].controllers.user.checkMailForPassword
    });
  });
};

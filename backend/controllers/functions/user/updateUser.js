const User = require('../../../models/userModel');

const lang = require('../../../resources/lang');

const updateUser = async (req, res) => {
  const { email, name, address, phone, zipcode, isAdmin } = req.body;

  const checkExistingEmail = await User.findOne({ email });

  if (checkExistingEmail !== null) {
    return res.status(403).send(lang[req.currentLang].controllers.user.userWithEmailAlreadyExists);
  }

  let findUserQuery = {};

  if (req.user._id !== undefined) {
    // When route is PUT /api/users/user/:_id
    findUserQuery = { _id: req.user._id };
  } else {
    // When route is POST /api/users/current
    findUserQuery = { email: req.user.email };
  }

  try {
    await User
      .updateOne(findUserQuery, {
        email,
        name,
        phone,
        address,
        zipcode,
        isAdmin
      });

    return res.status(200).json({
      msg: lang[req.currentLang].global.dataUpdated
    });
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports = updateUser;

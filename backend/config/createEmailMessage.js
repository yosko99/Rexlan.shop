const passwordResetHTML = require('../template/passwordResetHTML');

require('dotenv').config();

const createEmailMessage = (recieverEmail, password) => {
  return {
    from: process.env.SENDER_EMAIL,
    to: recieverEmail,
    subject: 'Password reset',
    text: 'Password reset',
    html: passwordResetHTML(password)
  };
};

module.exports = createEmailMessage;

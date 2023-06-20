
const initializeDummyData = require('./initializeDummyData');

const getDummyData = async () => {
  return await initializeDummyData({
    notLinkedCart: null,
    linkedCart: null,
    userLinkedWithCart: null,
    userNotLinkedWithCart: null,
    orderLinkedWithUser: null,
    userPassword: 'testing'
  });
};

module.exports = getDummyData;

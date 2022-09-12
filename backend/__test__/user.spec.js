const initializeDummyData = require('./config/initializeDummyData');
const deleteDummyData = require('./config/deleteDummyData');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');

describe('Testing user API', () => {
  let dummyData = {
    notLinkedCart: null,
    linkedCart: null,
    userLinkedWithCart: null,
    userNotLinkedWithCart: null,
    userPassword: 'testing'
  };

  const mockUserInfo = {
    email: 'tempData',
    password: 'tempData',
    name: 'tempData',
    address: 'tempData',
    phone: 'tempData'
  };

  const userStructure = {
    _id: expect.any(String),
    email: expect.any(String),
    name: expect.any(String),
    address: expect.any(String),
    phone: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    cartID: expect.any(String),
    zipcode: expect.any(String),
    __v: expect.any(Number),
    isAdmin: expect.any(Boolean)
  };

  beforeEach(async () => {
    dummyData = await initializeDummyData(dummyData);
  });

  afterEach(async () => {
    await deleteDummyData(dummyData);
    await User.deleteOne({ email: mockUserInfo.email });
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  test('get all users', () => {
    return request(app)
      .get('/api/users/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(userStructure)
          ])
        );
      });
  });

  test('create new user with provided cartID and sendtokenback flag', () => {
    return request(app)
      .post('/api/users/')
      .send({
        ...mockUserInfo,
        cartID: dummyData.notLinkedCart._id
      })
      .set('sendtokenback', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            msg: 'Your account has been successfully created.',
            token: expect.any(String),
            cartID: dummyData.notLinkedCart._id.toString()
          }));
      });
  });

  test('create new user with provided cartID without sendtokenback flag', () => {
    return request(app)
      .post('/api/users/')
      .send({
        ...mockUserInfo,
        cartID: dummyData.notLinkedCart._id
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            msg: 'The user was created'
          }));
      });
  });

  test('create new user without providing cartID and sendtokenback flag', () => {
    return request(app)
      .post('/api/users/')
      .send({
        ...mockUserInfo
      })
      .set('sendtokenback', true)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        const cartID = response.body.cartID;

        expect(response.body).toEqual(
          expect.objectContaining({
            msg: 'Your account has been successfully created.',
            token: expect.any(String),
            cartID: expect.any(String)
          }));

        await Cart.deleteOne({ _id: cartID });
      });
  });

  test('create new user without providing cartID and without sendtokenback flag', () => {
    return request(app)
      .post('/api/users/')
      .send({
        ...mockUserInfo
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        const createdUser = await User.findOne({ email: mockUserInfo.email });

        expect(response.body).toEqual(
          expect.objectContaining({
            msg: 'The user was created'
          }));

        await Cart.deleteOne({ _id: createdUser.cartID });
      });
  });

  test('create new user with provided existing email', () => {
    return request(app)
      .post('/api/users/')
      .send({
        email: dummyData.userLinkedWithCart.email
      })
      .expect('Content-Type', /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe('User with this email already exists.');
      });
  });

  test('create new user without providing data', () => {
    return request(app)
      .post('/api/users/')
      .expect('Content-Type', /json/)
      .expect(404);
  });

  test('login with valid email and password', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userLinkedWithCart.email,
        password: dummyData.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            msg: 'You Have Successfully Logged in.',
            token: expect.any(String),
            cartID: expect.any(String)
          }));
      });
  });

  test('login with valid email and unvalid password', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userNotLinkedWithCart.email,
        password: 'blabla'
      })
      .expect('Content-Type', /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe('Password does not match registered email.');
      });
  });

  test('login with email that is not registered', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: 'blabla@abv.bg'
      })
      .expect('Content-Type', /html/)
      .expect(403)
      .then((response) => {
        expect(response.text).toBe('User with this email does not exist.');
      });
  });

  test('reset password with provided registered email', () => {
    return request(app)
      .post('/api/users/password-reset')
      .send({
        email: dummyData.userLinkedWithCart.email
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe('You can check your email for a new password.');
      });
  });

  test('reset password with non registred email', () => {
    return request(app)
      .post('/api/users/password-reset')
      .send({
        email: 'blabla@abv.bg'
      })
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('We could not find your email.');
      });
  });

  test('reset password without providing email', () => {
    return request(app)
      .post('/api/users/password-reset')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('We could not find your email.');
      });
  });

  test('get current user with provided valid JWT token', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userLinkedWithCart.email,
        password: dummyData.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { token } = response.body;

        return request(app)
          .get('/api/users/current')
          .expect('Content-Type', /json/)
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .then(async (response) => {
            expect(response.body.user).toEqual(
              expect.objectContaining(userStructure)
            );
          });
      });
  });

  test('get current user without providing JWT token', () => {
    return request(app)
      .get('/api/users/current')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe('jwt must be provided');
      });
  });

  test('update current user with provided valid data and valid JWT token', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userLinkedWithCart.email,
        password: dummyData.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { token } = response.body;

        return request(app)
          .put('/api/users/current')
          .expect('Content-Type', /json/)
          .set('authorization', 'Bearer ' + token)
          .send({
            name: 'newName',
            phone: 'newPhone',
            address: 'newAddress',
            zip: 1234
          })
          .expect(200)
          .then((response) => {
            expect(response.body.msg).toBe('Data updated successfully');
          });
      });
  });

  test('update current user without providing JWT token', () => {
    return request(app)
      .put('/api/users/current')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe('jwt must be provided');
      });
  });

  test('change password with valid old password and JWT token', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userLinkedWithCart.email,
        password: dummyData.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { token } = response.body;

        return request(app)
          .post('/api/users/change-password')
          .expect('Content-Type', /json/)
          .set('authorization', 'Bearer ' + token)
          .send({
            oldPassword: dummyData.userPassword,
            newPassword: 'newPassword'
          })
          .expect(200)
          .then((response) => {
            expect(response.body.msg).toBe('Password updated successfully');
          });
      });
  });

  test('change password with provided JWT token but invalid old password', () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: dummyData.userLinkedWithCart.email,
        password: dummyData.userPassword
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { token } = response.body;

        return request(app)
          .post('/api/users/change-password')
          .expect('Content-Type', /html/)
          .set('authorization', 'Bearer ' + token)
          .send({
            oldPassword: 'invalid :D',
            newPassword: 'newPassword'
          })
          .expect(403)
          .then((response) => {
            expect(response.text).toBe('Password does not match registered email.');
          });
      });
  });

  test('change current user password without providing JWT token', () => {
    return request(app)
      .post('/api/users/change-password')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe('jwt must be provided');
      });
  });

  test('get user with provided registered user ID', async () => {
    const { _id } = await User.findOne({ email: dummyData.userLinkedWithCart.email });

    return request(app)
      .get('/api/users/user/' + _id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            email: dummyData.userLinkedWithCart.email,
            _id: expect.any(String),
            name: dummyData.userLinkedWithCart.name,
            address: dummyData.userLinkedWithCart.address,
            phone: dummyData.userLinkedWithCart.phone,
            isAdmin: expect.any(Boolean)
          })
        );
      });
  });

  test('get user with provided non registered user ID', () => {
    return request(app)
      .get('/api/users/user/12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Could not find user with provided email');
      });
  });

  test('update user name with provided registered ID', async () => {
    const { _id } = await User.findOne({ email: dummyData.userLinkedWithCart.email });

    return request(app)
      .put('/api/users/user/' + _id)
      .send({
        name: 'new name'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe('Data updated successfully');
      });
  });

  test('update user name with provided non registered ID', () => {
    return request(app)
      .put('/api/users/user/12char12char')
      .send({
        name: 'new name'
      })
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Could not find user with provided email');
      });
  });

  test('delete a registered user', () => {
    return request(app)
      .post('/api/users/')
      .send(mockUserInfo)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        const createdUser = await User.findOne({ name: mockUserInfo.name });

        return request(app)
          .del('/api/users/user/' + createdUser._id)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.msg).toBe('User successfully deleted.');

            await User.deleteOne({ _id: createdUser._id });
          });
      });
  });

  test('delete user with provided non registered ID', () => {
    return request(app)
      .del('/api/users/user/12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Could not find user with provided email');
      });
  });
});

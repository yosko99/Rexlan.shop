const Cart = require('../models/cartModel');
const User = require('../models/userModel');

const request = require('supertest');
const app = require('../app');

describe('Testing cart API', () => {
  let notLinkedCart;
  let linkedCart;
  let dummyUser;

  beforeEach(async () => {
    const exampleProducts = {
      productID: '7',
      productQuantity: 1,
      _id: '6266d22b4ea2743a8f439148'
    };

    notLinkedCart = await Cart({
      isLinked: false,
      products: [exampleProducts]
    }).save();

    linkedCart = await Cart({
      isLinked: true,
      products: [exampleProducts]
    }).save();

    dummyUser = await User({
      email: 'test@test@bg',
      password: 'testing',
      name: 'test',
      address: 'test',
      phone: 'test'
    }).save();

    linkedCart.userID = dummyUser._id;
    dummyUser.cartID = linkedCart._id;

    await linkedCart.save();
    await dummyUser.save();
  });

  afterEach(async () => {
    await User.deleteOne({ _id: dummyUser._id });
    await Cart.deleteMany({
      _id: [notLinkedCart._id, linkedCart._id]
    });
  });

  test('add product to already created cart with provided valid productID, cartID and product quantity', () => {
    return request(app)
      .post('/api/carts/')
      .send({
        productID: '1',
        cartID: notLinkedCart._id,
        productQuantity: 1
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: notLinkedCart._id.toString()
          })
        );
      });
  });

  test('add product to already created cart with provided valid productID, cartID', () => {
    return request(app)
      .post('/api/carts/')
      .send({
        productID: '1',
        cartID: notLinkedCart._id
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: notLinkedCart._id.toString()
          })
        );
      });
  });

  test('add product to already created cart with provided valid cartID but no product ID', () => {
    return request(app)
      .post('/api/carts/')
      .send({
        cartID: notLinkedCart._id
      })
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('No product ID provided');
      });
  });

  test('add product to non existant cart with provided valid ID', () => {
    return request(app)
      .post('/api/carts/')
      .send({
        productID: '1'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: expect.any(String)
          })
        );
      });
  });

  test('get cart that is not linked with user, with provided valid ID', () => {
    return request(app)
      .get(`/api/carts/${notLinkedCart._id.toString()}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            defaultValues: null,
            products: expect.arrayContaining([
              expect.objectContaining({
                productID: expect.any(String),
                productQuantity: expect.any(Number),
                _id: expect.any(String)
              })
            ])
          })
        );
      });
  });

  test('get cart that is not linked with user, with not valid ID', () => {
    return request(app)
      .get('/api/carts/blabla')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            err: 'Invalid cart ID'
          })
        );
      });
  });

  test('get cart that is linked to user, with provided valid ID', () => {
    return request(app)
      .get(`/api/carts/${linkedCart._id.toString()}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            defaultValues: expect.objectContaining({
              phone: dummyUser.phone,
              address: dummyUser.address,
              name: dummyUser.name
            }),
            products: expect.arrayContaining([
              expect.objectContaining({
                productID: expect.any(String),
                productQuantity: expect.any(Number),
                _id: expect.any(String)
              })
            ])
          })
        );
      });
  });
});

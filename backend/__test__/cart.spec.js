const request = require('supertest');
const mongoose = require('mongoose');

const deleteDummyData = require('./config/deleteDummyData');
const getDummyData = require('./config/getDummyData');

const app = require('../app');
const Cart = require('../models/cartModel');

const CART_ROUTE = '/api/carts/';
describe('Testing cart API', () => {
  const cartStructure = {
    products: expect.any(Array),
    isLinked: expect.any(Boolean),
    userID: expect.any(String),
    totalPrice: expect.any(Number),
    _id: expect.any(String)
  };
  let dummyData = {};

  beforeEach(async () => {
    dummyData = await getDummyData();
  });

  afterEach(async () => {
    await deleteDummyData(dummyData);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  test('get cart info with provided valid cartID', () => {
    return request(app)
      .get(CART_ROUTE + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(cartStructure);
      });
  });

  test('get cart info with provided invalid cartID', () => {
    return request(app)
      .get(CART_ROUTE + '12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('add product to already created cart with provided valid productID, cartID and product quantity', () => {
    return request(app)
      .post(CART_ROUTE)
      .send({
        productID: '1',
        cartID: dummyData.notLinkedCart._id,
        productQuantity: 1
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: dummyData.notLinkedCart._id.toString()
          })
        );
      });
  });

  test('add product to already created cart with provided valid productID, cartID', () => {
    return request(app)
      .post(CART_ROUTE)
      .send({
        productID: '1',
        cartID: dummyData.notLinkedCart._id
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: dummyData.notLinkedCart._id.toString()
          })
        );
      });
  });

  test('add product to already created cart with provided valid cartID but no product ID', () => {
    return request(app)
      .post(CART_ROUTE)
      .send({
        cartID: dummyData.notLinkedCart._id
      })
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('No product ID provided');
      });
  });

  test('add product to non existant cart with provided valid product ID', () => {
    return request(app)
      .post(CART_ROUTE)
      .send({
        productID: '1'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            cartID: expect.any(String)
          })

        );
        await Cart.deleteOne({ _id: response.body.cartID });
      });
  });

  test('get products of a cart that is not linked with user, with provided valid ID', () => {
    return request(app)
      .get(`${CART_ROUTE}products/${dummyData.notLinkedCart._id.toString()}`)
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

  test('get cart products with provided invalid cart ID', () => {
    return request(app)
      .get(CART_ROUTE + 'products/' + 'sada')
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

  test('get products from cart that is linked to user, with provided valid ID', () => {
    return request(app)
      .get(`${CART_ROUTE}/products/${dummyData.linkedCart._id.toString()}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            defaultValues: expect.objectContaining({
              phone: dummyData.userLinkedWithCart.phone,
              address: dummyData.userLinkedWithCart.address,
              name: dummyData.userLinkedWithCart.name
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

  test('delete product from cart with provided valid product ID and cart ID', () => {
    return request(app)
      .delete(CART_ROUTE + 'products')
      .send({
        cartID: dummyData.linkedCart._id,
        productID: '7'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe('Product removed');
      });
  });

  test('delete product from cart with provided valid product ID and unvalid cart ID', () => {
    return request(app)
      .delete(CART_ROUTE + 'products')
      .send({
        cartID: 'blabla',
        productID: '7'
      })
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid cart ID');
      });
  });

  test('delete a cart with provided invalid cartID', () => {
    return request(app)
      .delete(CART_ROUTE + '12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('delete a cart with provided valid cartID', () => {
    return request(app)
      .delete(CART_ROUTE + dummyData.notLinkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe('The cart was successfully removed.');
      });
  });

  test('delete a cart with provided valid cartID and check if cartID in response is null', () => {
    return request(app)
      .del(CART_ROUTE + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.cartID).toBe(null);
      });
  });

  test('detele a cart with provided valid cartID and passed reassignCartToUser query', () => {
    return request(app)
      .del(CART_ROUTE + dummyData.linkedCart._id + '?reassignCartToUser=true')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const newCartID = response.body.cartID;

        return request(app)
          .get(CART_ROUTE + newCartID)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.userID).toBe(dummyData.userLinkedWithCart._id.toString());

            await Cart.deleteOne({ _id: newCartID });
          });
      });
  });

  test('delete a cart with provided valid cartID and check if orderStatus is updated', () => {
    return request(app)
      .del(CART_ROUTE + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        return request(app)
          .get('/api/orders/' + dummyData.linkedCart._id)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.orderStatus).toBe('Processing');
          });
      });
  });
});

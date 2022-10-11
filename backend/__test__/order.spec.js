const request = require('supertest');
const mongoose = require('mongoose');

const deleteDummyData = require('./config/deleteDummyData');

const Order = require('../models/orderModel');

const app = require('../app');
const getDummyData = require('./config/getDummyData');

const ORDERS_ROUTE = '/api/orders/';

describe('Testing orders API', () => {
  const orderStructure = {
    selectedCourier: expect.any(String),
    userID: expect.any(String),
    orderStatus: expect.any(String),
    name: expect.any(String),
    address: expect.any(String),
    city: expect.any(String),
    zipcode: expect.any(Number),
    phone: expect.any(String),
    productsPrice: expect.any(Number),
    deliveryPrice: expect.any(Number),
    products: expect.any(Array),
    cartID: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String)
  };

  let dummyData = {};

  const mockOrderInfo = {
    delivery: 'Speedy'
  };

  beforeEach(async () => {
    dummyData = await getDummyData();
  });

  afterEach(async () => {
    await deleteDummyData(dummyData);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });
  test('create new order with anonymous cartID', () => {
    return request(app)
      .post(ORDERS_ROUTE)
      .send({
        ...mockOrderInfo,
        cartID: dummyData.notLinkedCart._id
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        const orderID = response.body.orderID;

        await Order.deleteOne({ _id: orderID });
      });
  });

  test('create new order with cart linked to user', () => {
    return request(app)
      .post(ORDERS_ROUTE)
      .send({
        ...mockOrderInfo,
        cartID: dummyData.linkedCart._id
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        const orderID = response.body.orderID;
        const newOrder = await Order.findOne({ _id: orderID });

        expect(newOrder.userID.toString())
          .toBe(dummyData.userLinkedWithCart._id.toString());

        await Order.deleteOne({ _id: orderID });
      });
  });

  test('create new order without providing cartID', () => {
    return request(app)
      .post(ORDERS_ROUTE)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('cet order without providing cartID', () => {
    return request(app)
      .get(ORDERS_ROUTE + '12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('get order with providing valid cartID', () => {
    return request(app)
      .get(ORDERS_ROUTE + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(orderStructure);
      });
  });

  test('delete order with provided invalid cartID', () => {
    return request(app)
      .delete(ORDERS_ROUTE + '12char12char')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('delete order with provided valid cartID', () => {
    return request(app)
      .delete(ORDERS_ROUTE + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe('The order was successfully removed.');
      });
  });

  test('get all users orders with provided invalid cartID', () => {
    return request(app)
      .get(ORDERS_ROUTE + 'user/' + 'test')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });

  test('get all user orders with provided valid cartID', () => {
    return request(app)
      .get(ORDERS_ROUTE + 'user/' + dummyData.linkedCart._id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(orderStructure)
          ]));
      });
  });
});

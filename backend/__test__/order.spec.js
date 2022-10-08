const request = require('supertest');
const mongoose = require('mongoose');

const initializeDummyData = require('./config/initializeDummyData');
const deleteDummyData = require('./config/deleteDummyData');

const Order = require('../models/orderModel');

const app = require('../app');

describe('Testing orders API', () => {
  const orderStructure = {
    selectedCourier: expect.any(String),
    usedID: expect.any(String),
    orderStatus: expect.any(String),
    name: expect.any(String),
    address: expect.any(String),
    city: expect.any(String),
    zipcode: expect.any(String),
    phone: expect.any(String),
    productsPrice: expect.any(Number),
    deliveryPrice: expect.any(Number),
    products: expect.any(Array),
    orderID: expect.any(String)
  };

  let dummyData = {
    notLinkedCart: null,
    linkedCart: null,
    userLinkedWithCart: null,
    userNotLinkedWithCart: null
  };

  const mockOrderInfo = {
    delivery: 'Speedy'
  };

  beforeAll(async () => {
    dummyData = await initializeDummyData(dummyData);
  });

  afterAll(async () => {
    await deleteDummyData(dummyData);
    mongoose.disconnect();
  });

  test('Create new order with anonymous cartID', () => {
    return request(app)
      .post('/api/orders/')
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

  test('Create new order with cart linked to user', () => {
    return request(app)
      .post('/api/orders/')
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

  test('Create new order without providing cartID', () => {
    return request(app)
      .post('/api/orders/')
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Invalid or not provided cart ID');
      });
  });
});

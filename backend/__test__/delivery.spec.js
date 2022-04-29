const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

describe('Testing delivery API', () => {
  let deliveryStructure;

  beforeAll(() => {
    deliveryStructure = {
      title: expect.any(String),
      initialPrice: expect.any(Number),
      priceToAddress: expect.any(Number),
      image: expect.any(String)
    };
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Get all deliveries', () => {
    return request(app)
      .get('/api/deliveries/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(deliveryStructure)
          ]));
      });
  });
});

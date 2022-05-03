const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

describe('Testing openweather API', () => {
  afterAll(() => {
    mongoose.disconnect();
  });

  test('get current city with provided valid coordinates', () => {
    return request(app)
      .post('/api/openweather/city')
      .send({
        lat: '43.8626',
        lon: '25.9648'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            city: expect.any(String)
          })
        );
      });
  });

  test('get current city without providing coordinates', () => {
    return request(app)
      .post('/api/openweather/city')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Coordinates not provided');
      });
  });

  test('get current city with wrong coordinates', () => {
    return request(app)
      .post('/api/openweather/city')
      .send({
        lat: 'blabla1231',
        lon: '25.9648'
      })
      .expect('Content-Type', /html/)
      .expect(400)
      .then((response) => {
        expect(response.text).toBe('Invalid coordinates');
      });
  });
});

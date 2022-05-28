const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

describe('Testing category API', () => {
  let categoryStrucutre;

  beforeAll(() => {
    categoryStrucutre = {
      name: expect.any(String),
      bannerImage: expect.any(String)
    };
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('get all categories', () => {
    return request(app)
      .get('/api/categories/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(categoryStrucutre)
          ]));
      });
  });
});

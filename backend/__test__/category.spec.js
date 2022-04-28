const request = require('supertest');
const app = require('../app');

describe('Testing category API', () => {
  let categoryStrucutre;

  beforeEach(() => {
    categoryStrucutre = {
      name: expect.any(String)
    };
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

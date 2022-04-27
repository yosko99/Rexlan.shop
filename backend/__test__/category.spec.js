const request = require('supertest');
const app = require('../app');

describe('Testing category API', () => {
  test('get all categories', async () => {
    await request(app)
      .get('/api/categories/')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

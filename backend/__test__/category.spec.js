const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Category = require('../models/categoryModel');

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

  test('create new category with provided valid data', () => {
    return request(app)
      .post('/api/categories')
      .send({
        name: 'test',
        bannerImage: 'test'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (response) => {
        expect(response.body.msg).toBe('Category created.');

        await Category.deleteOne({ name: 'test' });
      });
  });
});

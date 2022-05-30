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
      .post('/api/categories/')
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

  test('update a existing category', () => {
    return request(app)
      .post('/api/categories/')
      .send({
        name: 'test',
        bannerImage: 'test'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        return request(app)
          .put('/api/categories/test')
          .send({
            name: 'new name',
            bannerImage: 'test'
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.msg).toBe('Category updated.');

            await Category.deleteOne({ name: 'new name' });
          });
      });
  });

  test('update non existing category', () => {
    return request(app)
      .put('/api/categories/asd')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((reponse) => {
        expect(reponse.text).toBe('Category with provided name does not exists.');
      });
  });

  test('delete a existing categry', () => {
    return request(app)
      .post('/api/categories/')
      .send({
        name: 'test',
        bannerImage: 'test'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        return request(app)
          .del('/api/categories/test')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.msg).toBe('Category deleted.');
          });
      });
  });

  test('delete non existing category', () => {
    return request(app)
      .del('/api/categories/asd')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((reponse) => {
        expect(reponse.text).toBe('Category with provided name does not exists.');
      });
  });
});

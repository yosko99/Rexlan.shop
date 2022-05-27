const Product = require('../models/productModel');
const app = require('../app');

const request = require('supertest');
const mongoose = require('mongoose');

describe('Testing product API', () => {
  let productStructure;

  beforeAll(() => {
    productStructure = {
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      category: expect.any(String),
      image: expect.any(String),
      rating: expect.objectContaining({
        rate: expect.any(Number),
        count: expect.any(Number)
      })
    };
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  test('get all products', () => {
    return request(app)
      .get('/api/products/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
      });
  });

  test('get specific number of products', () => {
    return request(app)
      .get('/api/products?qty=4')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
        expect(response.body).toHaveLength(4);
      });
  });

  test('get single product with valid id', () => {
    return request(app)
      .get('/api/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining(productStructure));
      });
  });

  test('get product with invalid id', async () => {
    const response = await request(app)
      .get('/api/products/test')
      .expect('Content-Type', /html/);

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Could not find data with provided ID');
  });

  test('get product with valid category', () => {
    return request(app)
      .get('/api/products/category/electronics')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
      });
  });

  test('get product with valid category and specified quantity', () => {
    return request(app)
      .get('/api/products/category/electronics?qty=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
        expect(response.body).toHaveLength(1);
      });
  });

  test('get product with invalid category', async () => {
    const response = await request(app)
      .get('/api/products/category/test')
      .expect('Content-Type', /html/);

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Could not find data with provided category');
  });

  test('get products sorted with valid attribute', () => {
    return request(app)
      .get('/api/products/sort/price')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
      });
  });

  test('get products sorted with valid attribute and specified quantity', () => {
    return request(app)
      .get('/api/products/sort/price?qty=2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
        expect(response.body).toHaveLength(2);
      });
  });

  test('get products sorted with invalid attribute', () => {
    return request(app)
      .get('/api/products/sort/test')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(productStructure)
          ]));
      });
  });

  test('update product with provided valid ID', () => {
    return request(app)
      .get('/api/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const oldProduct = response.body;

        return request(app)
          .put('/api/products/1')
          .send({
            title: 'New title',
            price: oldProduct.price,
            description: oldProduct.description,
            category: oldProduct.category,
            image: oldProduct.image
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then(async (response) => {
            expect(response.body.msg).toBe('Data updated');

            // Reset product name after test
            await Product.updateOne({ id: '1' }, {
              title: oldProduct.title
            });
          });
      });
  });

  test('update product with invalid ID', () => {
    return request(app)
      .put('/api/products/blabla')
      .expect('Content-Type', /html/)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('Cannot find product with provided id.');
      });
  });
});

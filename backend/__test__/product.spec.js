const request = require('supertest');
const app = require('../app');

describe('Testing product API', () => {
  test('get all products', async () => {
    await request(app)
      .get('/api/products/')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('get specific number of products', async () => {
    const response = await request(app)
      .get('/api/products?qty=4')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  test('get single product with valid id', async () => {
    const response = await request(app)
      .get('/api/products/1')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
  });

  test('get product with invalid id', async () => {
    const response = await request(app)
      .get('/api/products/test')
      .expect('Content-Type', /html/);

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Could not find data with provided ID');
  });

  test('get product with valid category', async () => {
    const response = await request(app)
      .get('/api/products/category/electronics')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
  });

  test('get product with valid category and specified quantity', async () => {
    const response = await request(app)
      .get('/api/products/category/electronics?qty=1')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('get product with invalid category', async () => {
    const response = await request(app)
      .get('/api/products/category/test')
      .expect('Content-Type', /html/);

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Could not find data with provided category');
  });

  test('get products sorted with valid attribute', async () => {
    const response = await request(app)
      .get('/api/products/sort/price')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
  });

  test('get products sorted with valid attribute and specified quantity', async () => {
    const response = await request(app)
      .get('/api/products/sort/price?qty=2')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('get products sorted with invalid attribute', async () => {
    const response = await request(app)
      .get('/api/products/sort/test')
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(200);
  });
});

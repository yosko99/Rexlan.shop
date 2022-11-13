import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

import { TestModule } from '../../../test/config/test.module';
import { AppModule } from '../../../app.module';

import { TestService } from '../../../test/config/test.service';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing products API', () => {
  let testService: TestService;
  let app: INestApplication;
  let productStructure;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);

    testService = module.get<TestService>(TestService);

    productStructure = testService.getProductStructure();

    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('test GET products/ route', () => {
    test('get all products', () => {
      return request(app.getHttpServer())
        .get('/products/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
        });
    });

    test('get specific number of products', () => {
      return request(app.getHttpServer())
        .get('/products?qty=4')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
          expect(response.body).toHaveLength(4);
        });
    });
  });

  describe('test GET products/:id route', () => {
    test('get single product with valid id', () => {
      return request(app.getHttpServer())
        .get('/products/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining(productStructure),
          );
        });
    });

    test('get product with invalid id', () => {
      return request(app.getHttpServer())
        .get('/products/test')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.status).toBe(404);
          expect(response.body.message).toBe(
            'Could not find data with provided ID',
          );
        });
    });
  });

  describe('test GET products/category/:category route', () => {
    test('get product with valid category', () => {
      return request(app.getHttpServer())
        .get('/products/category/electronics')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
        });
    });

    test('get product with valid category and specified quantity', () => {
      return request(app.getHttpServer())
        .get('/products/category/electronics?qty=1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
          expect(response.body).toHaveLength(1);
        });
    });

    test('get product with invalid category', () => {
      return request(app.getHttpServer())
        .get('/products/category/test')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Could not find data with provided category',
              products: [],
            }),
          );
        });
    });
  });

  describe('test GET products/sort/:attribute route', () => {
    test('get products sorted with valid attribute', () => {
      return request(app.getHttpServer())
        .get('/products/sort/price')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
        });
    });

    test('get products sorted with valid attribute and specified quantity', () => {
      return request(app.getHttpServer())
        .get('/products/sort/price?qty=2')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
          expect(response.body).toHaveLength(2);
        });
    });

    test('get products sorted with invalid attribute', () => {
      return request(app.getHttpServer())
        .get('/products/sort/test')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(productStructure)]),
          );
        });
    });
  });

  describe('test PUT products/:id route', () => {
    test('update product with provided valid ID', () => {
      return request(app.getHttpServer())
        .get('/products/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const oldProduct = response.body;

          return request(app.getHttpServer())
            .put('/products/1')
            .send({
              title: 'New title',
              price: oldProduct.price,
              description: oldProduct.description,
              category: oldProduct.category,
              image: oldProduct.image,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
              expect(response.body.msg).toBe('The product was updated');

              // Reset product name after test
              return request(app.getHttpServer())
                .put('/products/1')
                .send({ title: oldProduct.title });
            });
        });
    });

    test('update product with invalid ID', () => {
      return request(app.getHttpServer())
        .put('/products/blabla')
        .expect('Content-Type', /html/)
        .expect(404)
        .then((response) => {
          expect(response.text).toBe('Cannot find product with provided id.');
        });
    });
  });

  describe('test DELETE products/:id', () => {
    test('delete product with valid product ID', () => {
      return request(app.getHttpServer())
        .post('/products/')
        .send({
          title: 'test',
          price: 1,
          description: 'test',
          category: "men's clothing",
          image: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          const createdProductID = response.body.product.id;

          return request(app.getHttpServer())
            .del('/products/' + createdProductID)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
              expect(response.body.msg).toBe('Data successfully deleted.');
            });
        });
    });

    test('delete product with invalid product ID', () => {
      return request(app.getHttpServer())
        .del('/products/blabla')
        .expect('Content-Type', /html/)
        .expect(404)
        .then((response) => {
          expect(response.text).toBe('Cannot find product with provided id.');
        });
    });
  });

  describe('test POST products/ route', () => {
    test('create a product with valid data', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          title: 'test',
          price: 1,
          description: 'test',
          category: "men's clothing",
          image: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body.msg).toBe('The product was created');

          const createdProductID = response.body.product.id;
          return request(app.getHttpServer())
            .del('/products/' + createdProductID)
            .expect(200);
        });
    });

    test('create a product with valid data and invalid category name', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          title: 'test',
          price: 1,
          description: 'test',
          category: 'test',
          image: 'test',
        })
        .expect('Content-Type', /json/)

        .expect(201)
        .then(async (response) => {
          expect(response.body.message).toBe(
            'Category with provided name does not exists',
          );
        });
    });
  });
});

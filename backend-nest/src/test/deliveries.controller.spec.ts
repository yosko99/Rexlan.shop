import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../middleware/utils/setLanguage.middleware';

import { AppModule } from '../app.module';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing deliveries API', () => {
  const deliveryStructure = {
    title: expect.any(String),
    initialPrice: expect.any(Number),
    priceToAddress: expect.any(Number),
    image: expect.any(String),
  };
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('test root route', () => {
    test('get all deliveries', () => {
      return request(app.getHttpServer())
        .get('/deliveries')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining(deliveryStructure),
            ]),
          );
        });
    });
  });
});

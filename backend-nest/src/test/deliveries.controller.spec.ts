import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../middleware/utils/setLanguage.middleware';

import { TestModule } from './config/test.module';
import { AppModule } from '../app.module';

import { TestService } from './config/test.service';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing deliveries API', () => {
  let testService: TestService;
  let app: INestApplication;
  let deliveryStructure;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);

    testService = module.get<TestService>(TestService);

    deliveryStructure = testService.getDeliveryStructure();

    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('test GET deliveries/ route', () => {
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

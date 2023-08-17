import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

import { TestModule } from '../../../test/config/test.module';
import { AppModule } from '../../../app.module';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing deliveries API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);

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
          expect(response.body).toEqual(expect.any(Array));
        });
    });
  });
});

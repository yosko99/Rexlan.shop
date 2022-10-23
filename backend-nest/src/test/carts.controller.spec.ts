import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../middleware/utils/setLanguage.middleware';

import { AppModule } from '../app.module';
import { TestModule } from './config/test.module';

import { TestService } from './config/test.service';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing carts API', () => {
  const cartStructure = {
    products: expect.any(Array),
    isLinked: expect.any(Boolean),
    userID: expect.any(String),
    totalPrice: expect.any(Number),
    _id: expect.any(String),
  };

  let dummyData = {};
  let app: INestApplication;
  let testService: TestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    testService = module.get<TestService>(TestService);
    dummyData = await testService.initializeAndGetDummyData();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  afterEach(async () => {
    await testService.deleteDummyData();
  });

  describe('test root route', () => {});
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

import { AppModule } from '../../../app.module';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing openweather API', () => {
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

  describe('test GET openweather/city route', () => {
    test('get current city with provided valid coordinates', () => {
      return request(app.getHttpServer())
        .get('/openweather/city?lon=25.9648&lat=43.8626')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              city: expect.any(String),
            }),
          );
        });
    });

    test('get current city without providing coordinates', () => {
      return request(app.getHttpServer())
        .get('/openweather/city')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.message).toBe('Coordinates not provided');
          expect(response.body.status).toBe(404);
        });
    });

    test('get current city with wrong coordinates', () => {
      return request(app.getHttpServer())
        .get('/openweather/city?lon=asdads213&lat=12')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.status).toBe(400);
          expect(response.body.message).toBe('Invalid coordinates');
        });
    });
  });
});

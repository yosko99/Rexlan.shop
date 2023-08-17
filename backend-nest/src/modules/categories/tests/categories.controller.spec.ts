import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

import { AppModule } from '../../../app.module';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing categories API', () => {
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

  describe('test GET categories/ route', () => {
    test('get all categories', () => {
      return request(app.getHttpServer())
        .get('/categories/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(expect.any(Array));
        });
    });
  });

  describe('test POST categories/ route', () => {
    test('create new category with provided valid data', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          title: 'test',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body.msg).toBe('The category was created');

          const createdCategoryID = response.body.category.id;
          return request(app.getHttpServer()).del(
            '/categories/' + createdCategoryID,
          );
        });
    });
  });

  describe('test PUT categories/:id route', () => {
    test('update a existing category', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          title: 'asdasd asd',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          const createdCategoryID = response.body.category.id;

          return request(app.getHttpServer())
            .put('/categories/' + createdCategoryID)
            .send({
              title: 'new name',
              bannerImage: 'test',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
              expect(response.body.msg).toBe('The category was updated');

              return request(app.getHttpServer()).del(
                '/categories/' + createdCategoryID,
              );
            });
        });
    });

    test('update non existing category', () => {
      return request(app.getHttpServer())
        .put('/categories/12char12char')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe(
            'Could not find data with provided ID',
          );
        });
    });
  });

  describe('test DELETE categories/:_id route', () => {
    test('delete a existing category', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          title: '12char12char',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const createdCategoryID = response.body.category.id;

          return request(app.getHttpServer())
            .del('/categories/' + createdCategoryID)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              expect(response.body.msg).toBe('Category deleted.');
            });
        });
    });

    test('delete non existing category', () => {
      return request(app.getHttpServer())
        .del('/categories/12char12char')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe(
            'Could not find data with provided ID',
          );
        });
    });
  });
});

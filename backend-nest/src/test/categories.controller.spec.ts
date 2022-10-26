import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../middleware/utils/setLanguage.middleware';

import { TestModule } from './config/test.module';
import { AppModule } from '../app.module';

import { TestService } from './config/test.service';

import dotenv = require('dotenv');
dotenv.config();

describe('Testing categories API', () => {
  let testService: TestService;
  let app: INestApplication;
  let categoryStrucutre;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);

    testService = module.get<TestService>(TestService);

    categoryStrucutre = testService.getCategoryStructure();

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
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining(categoryStrucutre),
            ]),
          );
        });
    });
  });

  describe('test POST categories/ route', () => {
    test('create new category with provided valid data', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          name: 'test',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body.msg).toBe('The category was created');

          const createdCategoryID = response.body.category._id;
          return request(app.getHttpServer()).del(
            '/categories/' + createdCategoryID,
          );
        });
    });
  });

  describe('test PUT categories/:_id route', () => {
    test('update a existing category', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          name: 'test',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          const createdCategoryID = response.body.category._id;

          return request(app.getHttpServer())
            .put('/categories/' + createdCategoryID)
            .send({
              name: 'new name',
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
        .expect('Content-Type', /html/)
        .expect(404)
        .then((reponse) => {
          expect(reponse.text).toBe(
            'Category with provided name does not exists.',
          );
        });
    });
  });

  describe('test DELETE categories/:_id route', () => {
    test('delete a existing category', () => {
      return request(app.getHttpServer())
        .post('/categories/')
        .send({
          name: 'test',
          bannerImage: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const createdCategoryID = response.body.category._id;

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
        .expect('Content-Type', /html/)
        .expect(404)
        .then((reponse) => {
          expect(reponse.text).toBe(
            'Category with provided name does not exists.',
          );
        });
    });
  });
});

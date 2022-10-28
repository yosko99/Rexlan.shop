import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

import { TestModule } from '../../../test/config/test.module';
import { AppModule } from '../../../app.module';

import { TestService } from '../../../test/config/test.service';

import { DummyDataType } from '../../../types/dummyData.types';
import { UserType } from '../../../types/user.types';

import dotenv = require('dotenv');
dotenv.config();

describe('test users API', () => {
  let testService: TestService;
  let dummyData: DummyDataType;
  let app: INestApplication;
  let userStructure;

  const mockUserInfo: UserType = {
    email: 'tempData',
    password: 'tempData',
    name: 'tempData',
    address: 'tempData',
    phone: 'tempData',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = module.createNestApplication();
    app.use(setLanguageMiddleware);

    testService = module.get<TestService>(TestService);

    userStructure = testService.getUserStructure();

    await app.init();
  });

  beforeEach(async () => {
    dummyData = await testService.initializeAndGetDummyData();
  });

  afterEach(async () => {
    await testService.deleteDummyData();
  });

  afterAll(async () => {
    app.close();
  });

  describe('test GET users/ route', () => {
    test('get all users', () => {
      return request(app.getHttpServer())
        .get('/users/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(userStructure)]),
          );
        });
    });
  });

  describe('test POST users/ route', () => {
    test('create new user with provided cartID and sendtokenback flag', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send({
          ...mockUserInfo,
          cartID: dummyData.notLinkedCart._id,
        })
        .set('sendtokenback', 'true')
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Your account has been successfully created.',
              token: expect.any(String),
              cartID: dummyData.notLinkedCart._id.toString(),
              user: expect.any(Object),
            }),
          );

          return request(app.getHttpServer()).del(
            '/users/' + response.body.user._id,
          );
        });
    });

    test('create new user with provided cartID without sendtokenback flag', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send({
          ...mockUserInfo,
          cartID: dummyData.notLinkedCart._id,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'The user was created',
              user: expect.any(Object),
            }),
          );

          return request(app.getHttpServer()).del(
            '/users/' + response.body.user._id,
          );
        });
    });

    test('create new user without providing cartID and sendtokenback flag', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send({
          ...mockUserInfo,
        })
        .set('sendtokenback', 'true')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Your account has been successfully created.',
              token: expect.any(String),
              cartID: expect.any(String),
              user: expect.any(Object),
            }),
          );

          return request(app.getHttpServer())
            .del('/carts/' + response.body.user.cartID)
            .then(() => {
              return request(app.getHttpServer()).del(
                '/users/' + response.body.user._id,
              );
            });
        });
    });

    test('create new user without providing cartID and without sendtokenback flag', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send({
          ...mockUserInfo,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'The user was created',
              user: expect.any(Object),
            }),
          );

          return request(app.getHttpServer())
            .del('/carts/' + response.body.user.cartID)
            .then(() => {
              return request(app.getHttpServer()).del(
                '/users/' + response.body.user._id,
              );
            });
        });
    });

    test('create new user with provided existing email', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send({
          email: dummyData.userLinkedWithCart.email,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body.message).toBe(
            'User with this email already exists.',
          );
          expect(response.body.status).toBe(403);
        });
    });
  });

  describe('test DELETE users/ route', () => {
    test('delete a registered user', () => {
      return request(app.getHttpServer())
        .post('/users/')
        .send(mockUserInfo)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          return request(app.getHttpServer())
            .del('/users/' + response.body.user._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
              expect(response.body.msg).toBe('User successfully deleted.');
            });
        });
    });

    test('delete user with provided non registered ID', () => {
      return request(app.getHttpServer())
        .del('/users/12char12char')
        .expect('Content-Type', /html/)
        .expect(404)
        .then((response) => {
          expect(response.text).toBe('Could not find user with provided email');
        });
    });
  });
});

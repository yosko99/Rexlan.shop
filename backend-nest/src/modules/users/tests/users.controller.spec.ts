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

  describe('test POST users/login route', () => {
    test('login with valid email and password', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userLinkedWithCart.email,
          password: dummyData.userPassword,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'You Have Successfully Logged in.',
              token: expect.any(String),
              cartID: expect.any(String),
            }),
          );
        });
    });

    test('login with valid email and unvalid password', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userNotLinkedWithCart.email,
          password: 'blabla',
        })
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.message).toBe(
            'Password does not match registered email.',
          );
          expect(response.body.status).toBe(403);
        });
    });

    test('login with email that is not registered', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: 'blabla@abv.bg',
        })
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.message).toBe(
            'User with this email does not exist.',
          );
          expect(response.body.status).toBe(403);
        });
    });
  });

  describe('test PUT users/current route', () => {
    test('update current user with provided valid data and valid JWT token', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userLinkedWithCart.email,
          password: dummyData.userPassword,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const { token } = response.body;

          return request(app.getHttpServer())
            .put('/users/current')
            .expect('Content-Type', /json/)
            .set('authorization', 'Bearer ' + token)
            .send({
              name: 'newName',
              phone: 'newPhone',
              address: 'newAddress',
              zip: 1234,
            })
            .expect(200)
            .then((response) => {
              expect(response.body.msg).toBe('Data updated successfully');
            });
        });
    });

    test('update current user without providing JWT token', () => {
      return request(app.getHttpServer())
        .put('/users/current')
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body.message).toBe('jwt must be provided');
        });
    });
  });

  describe('test GET users/user/:_id route', () => {
    test('get user with provided registered user ID', async () => {
      return request(app.getHttpServer())
        .get('/users/user/' + dummyData.userLinkedWithCart._id)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              email: dummyData.userLinkedWithCart.email,
              _id: expect.any(String),
              name: dummyData.userLinkedWithCart.name,
              address: dummyData.userLinkedWithCart.address,
              phone: dummyData.userLinkedWithCart.phone,
              isAdmin: expect.any(Boolean),
            }),
          );
        });
    });

    test('get user with provided non registered user ID', () => {
      return request(app.getHttpServer())
        .get('/users/user/12char12char')
        .expect('Content-Type', /html/)
        .expect(404)
        .then((response) => {
          expect(response.text).toBe('Could not find user with provided email');
        });
    });
  });

  describe('test PUT users/user/:_id', () => {
    test('update user name with provided registered ID', async () => {
      return request(app.getHttpServer())
        .put('/users/user/' + dummyData.userLinkedWithCart._id)
        .send({
          name: 'new name',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe('Data updated successfully');
        });
    });

    test('update user name with provided non registered ID', () => {
      return request(app.getHttpServer())
        .put('/users/user/12char12char')
        .send({
          name: 'new name',
        })
        .expect('Content-Type', /html/)
        .expect(404)
        .then((response) => {
          expect(response.text).toBe('Could not find user with provided email');
        });
    });
  });

  describe('test GET users/current route', () => {
    test('get current user with provided valid JWT token', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userLinkedWithCart.email,
          password: dummyData.userPassword,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const { token } = response.body;

          return request(app.getHttpServer())
            .get('/users/current')
            .expect('Content-Type', /json/)
            .set('authorization', 'Bearer ' + token)
            .expect(200)
            .then(async (response) => {
              expect(response.body.user).toEqual(
                expect.objectContaining(userStructure),
              );
            });
        });
    });

    test('get current user without providing JWT token', () => {
      return request(app.getHttpServer())
        .get('/users/current')
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body.message).toBe('jwt must be provided');
        });
    });
  });

  describe('test PUT users/current/change-password route', () => {
    test('change current user password with valid old password and JWT token', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userLinkedWithCart.email,
          password: dummyData.userPassword,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const { token } = response.body;

          return request(app.getHttpServer())
            .put('/users/current/change-password')
            .expect('Content-Type', /json/)
            .set('authorization', 'Bearer ' + token)
            .send({
              oldPassword: dummyData.userPassword,
              newPassword: 'newPassword',
            })
            .expect(200)
            .then((response) => {
              expect(response.body.msg).toBe('Password updated successfully');
            });
        });
    });

    test('change curernt user password with provided JWT token but invalid old password', () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: dummyData.userLinkedWithCart.email,
          password: dummyData.userPassword,
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          const { token } = response.body;

          return request(app.getHttpServer())
            .put('/users/current/change-password')
            .expect('Content-Type', /json/)
            .set('authorization', 'Bearer ' + token)
            .send({
              oldPassword: 'invalid :D',
              newPassword: 'newPassword',
            })
            .then((response) => {
              expect(response.body.message).toBe(
                'Password does not match registered email.',
              );
              expect(response.body.status).toBe(403);
            });
        });
    });

    test('change current user password without providing JWT token', () => {
      return request(app.getHttpServer())
        .put('/users/current/change-password')
        .expect('Content-Type', /json/)
        .expect(403)
        .then((response) => {
          expect(response.body.message).toBe('jwt must be provided');
        });
    });
  });
});

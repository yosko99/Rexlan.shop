// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

// import { AppModule } from '../../../app.module';
// import { TestModule } from '../../../test/config/test.module';

// import { TestService } from '../../../test/config/test.service';

// import { DummyDataType } from '../../../types/dummyData.types';

// import dotenv = require('dotenv');
// dotenv.config();

// describe('Testing orders API', () => {
//   let dummyData: DummyDataType;
//   const mockOrderInfo = {
//     delivery: 'Speedy',
//   };

//   let orderStructure;

//   let app: INestApplication;
//   let testService: TestService;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AppModule, TestModule],
//     }).compile();

//     app = module.createNestApplication();
//     app.use(setLanguageMiddleware);

//     testService = module.get<TestService>(TestService);

//     orderStructure = testService.getOrderStructure();

//     await app.init();
//   });

//   beforeEach(async () => {
//     dummyData = await testService.initializeAndGetDummyData();
//   });

//   afterEach(async () => {
//     await testService.deleteDummyData();
//   });

//   afterAll(async () => {
//     app.close();
//   });

//   describe('test GET orders/:cartID route', () => {
//     test('get order without providing cartID', () => {
//       return request(app.getHttpServer())
//         .get('/orders/12char12char')
//         .expect('Content-Type', /html/)
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });

//     test('get order with providing valid cartID', () => {
//       return request(app.getHttpServer())
//         .get('/orders/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(orderStructure);
//         });
//     });
//   });

//   describe('test DELETE orders/:cartID route', () => {
//     test('delete order with provided invalid cartID', () => {
//       return request(app.getHttpServer())
//         .delete('/orders/12char12char')
//         .expect('Content-Type', /html/)
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });

//     test('delete order with provided valid cartID', () => {
//       return request(app.getHttpServer())
//         .delete('/orders/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body.msg).toBe('The order was successfully removed.');
//         });
//     });
//   });

//   describe('test GET orders/user/:cartID route', () => {
//     test('get all users orders with provided invalid cartID', () => {
//       return request(app.getHttpServer())
//         .get('/orders/user/' + 'test')
//         .expect('Content-Type', /html/)
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });

//     test('get all user orders with provided valid cartID', () => {
//       return request(app.getHttpServer())
//         .get('/orders/user/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.arrayContaining([expect.objectContaining(orderStructure)]),
//           );
//         });
//     });
//   });

//   describe('test POST orders/ route', () => {
//     test('create new order with anonymous cartID', () => {
//       return request(app.getHttpServer())
//         .post('/orders/')
//         .send({
//           ...mockOrderInfo,
//           cartID: dummyData.notLinkedCart._id,
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then(async (response) => {
//           const orderCartID = response.body.order.cartID;

//           return request(app.getHttpServer()).del('/orders/' + orderCartID);
//         });
//     });

//     test('create new order with cart linked to user', () => {
//       return request(app.getHttpServer())
//         .post('/orders/')
//         .send({
//           ...mockOrderInfo,
//           cartID: dummyData.linkedCart._id,
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then(async (response) => {
//           return request(app.getHttpServer())
//             .get('/orders/' + dummyData.linkedCart._id)
//             .expect('Content-Type', /json/)
//             .then((response) => {
//               expect(response.body.userID.toString()).toBe(
//                 dummyData.userLinkedWithCart._id.toString(),
//               );

//               return request(app.getHttpServer()).del(
//                 '/orders/' + dummyData.linkedCart._id,
//               );
//             });
//         });
//     });

//     test('create new order without providing cartID', () => {
//       return request(app.getHttpServer())
//         .post('/orders/')
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });
//   });
// });

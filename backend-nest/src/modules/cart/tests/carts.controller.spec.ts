// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// import setLanguageMiddleware from '../../../middleware/utils/setLanguage.middleware';

// import { AppModule } from '../../../app.module';

// import dotenv = require('dotenv');
// dotenv.config();

// describe('Testing carts API', () => {
//   let cartStructure;
//   let dummyData: DummyDataType;
//   let app: INestApplication;
//   let testService: TestService;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     testService = module.get<TestService>(TestService);

//     cartStructure = testService.getCartStructure();

//     app = module.createNestApplication();
//     app.use(setLanguageMiddleware);

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

//   describe('test GET carts/:cartID route', () => {
//     test('get cart info with provided valid cartID', () => {
//       return request(app.getHttpServer())
//         .get('/carts/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(cartStructure);
//         });
//     });

//     test('get cart info with provided invalid cartID', () => {
//       return request(app.getHttpServer())
//         .get('/carts/' + '12char12char')
//         .expect('Content-Type', /html/)
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });
//   });

//   describe('test POST carts/ route', () => {
//     test('add product to already created cart with provided valid productID, cartID and product quantity', () => {
//       return request(app.getHttpServer())
//         .post('/carts')
//         .send({
//           productID: '1',
//           cartID: dummyData.notLinkedCart._id,
//           productQuantity: 1,
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               cartID: dummyData.notLinkedCart._id.toString(),
//             }),
//           );
//         });
//     });

//     test('add product to already created cart with provided valid productID, cartID', () => {
//       return request(app.getHttpServer())
//         .post('/carts')
//         .send({
//           productID: '1',
//           cartID: dummyData.notLinkedCart._id,
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               cartID: dummyData.notLinkedCart._id.toString(),
//             }),
//           );
//         });
//     });

//     test('add product to already created cart with provided valid cartID but no product ID', () => {
//       return request(app.getHttpServer())
//         .post('/carts')
//         .send({
//           cartID: dummyData.notLinkedCart._id,
//         })
//         .expect('Content-Type', /json/)
//         .then((response) => {
//           expect(response.body.message).toBe('No product ID provided');
//           expect(response.body.status).toBe(404);
//         });
//     });

//     test('add product to non existant cart with provided valid product ID', () => {
//       return request(app.getHttpServer())
//         .post('/carts')
//         .send({
//           productID: '1',
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then(async (response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               cartID: expect.any(String),
//             }),
//           );
//           return request(app.getHttpServer()).del(
//             '/carts/' + response.body.cartID,
//           );
//         });
//     });
//   });

//   describe('test GET carts/products/:cartID route', () => {
//     test('get products of a cart that is not linked with user, with provided valid ID', () => {
//       return request(app.getHttpServer())
//         .get(`/carts/products/${dummyData.notLinkedCart._id.toString()}`)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               defaultValues: null,
//               products: expect.arrayContaining([
//                 expect.objectContaining({
//                   productID: expect.any(String),
//                   productQuantity: expect.any(Number),
//                 }),
//               ]),
//             }),
//           );
//         });
//     });

//     test('get cart products with provided invalid cart ID', () => {
//       return request(app.getHttpServer())
//         .get('/carts/products/sad')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               err: 'Invalid cart ID',
//             }),
//           );
//         });
//     });

//     test('get products from cart that is linked to user, with provided valid ID', () => {
//       return request(app.getHttpServer())
//         .get(`/carts/products/${dummyData.linkedCart._id.toString()}`)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body).toEqual(
//             expect.objectContaining({
//               defaultValues: expect.objectContaining({
//                 phone: dummyData.userLinkedWithCart.phone,
//                 address: dummyData.userLinkedWithCart.address,
//                 name: dummyData.userLinkedWithCart.name,
//               }),
//               products: expect.arrayContaining([
//                 expect.objectContaining({
//                   productID: expect.any(String),
//                   productQuantity: expect.any(Number),
//                 }),
//               ]),
//             }),
//           );
//         });
//     });
//   });

//   describe('test PUT carts/product route', () => {
//     test('delete product from cart with provided valid product ID and cart ID', () => {
//       return request(app.getHttpServer())
//         .put('/carts/products')
//         .send({
//           cartID: dummyData.linkedCart._id,
//           productID: '7',
//         })
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body.msg).toBe('Product removed');
//         });
//     });

//     test('delete product from cart with provided valid product ID and unvalid cart ID', () => {
//       return request(app.getHttpServer())
//         .put('/carts/products')
//         .send({
//           cartID: 'blabla',
//           productID: '7',
//         })
//         .expect('Content-Type', /json/)
//         .then((response) => {
//           expect(response.body.message).toBe('Invalid cart ID');
//           expect(response.body.status).toBe(404);
//         });
//     });
//   });

//   describe('test DELETE carts/:cartID route', () => {
//     test('delete a cart with provided invalid cartID', () => {
//       return request(app.getHttpServer())
//         .delete('/carts/12char12char')
//         .expect('Content-Type', /html/)
//         .expect(404)
//         .then((response) => {
//           expect(response.text).toBe('Invalid or not provided cart ID');
//         });
//     });

//     test('delete a cart with provided valid cartID', () => {
//       return request(app.getHttpServer())
//         .delete('/carts/' + dummyData.notLinkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body.msg).toBe('The cart was successfully removed.');
//         });
//     });

//     test('delete a cart with provided valid cartID and check if cartID in response is null', () => {
//       return request(app.getHttpServer())
//         .del('/carts/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           expect(response.body.cartID).toBe(null);
//         });
//     });

//     test('delete a cart with provided valid cartID and passed reassignCartToUser query', () => {
//       return request(app.getHttpServer())
//         .del('/carts/' + dummyData.linkedCart._id + '?reassignCartToUser=true')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((response) => {
//           const newCartID = response.body.cartID;

//           return request(app.getHttpServer())
//             .get('/carts/' + newCartID)
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(async (response) => {
//               expect(response.body.userID).toBe(
//                 dummyData.userLinkedWithCart._id.toString(),
//               );

//               return request(app.getHttpServer()).del('/carts/' + newCartID);
//             });
//         });
//     });

//     test('delete a cart with provided valid cartID and check if orderStatus is updated', () => {
//       return request(app.getHttpServer())
//         .del('/carts/' + dummyData.linkedCart._id)
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then((_response) => {
//           return request(app.getHttpServer())
//             .get('/orders/' + dummyData.linkedCart._id)
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((response) => {
//               expect(response.body.orderStatus).toBe('Processing');
//             });
//         });
//     });
//   });
// });

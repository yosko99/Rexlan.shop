// const request = require('supertest');
// const mongoose = require('mongoose');

// const app = require('../app');

// describe('Testing orders API', () => {
//   const orderStructure = {
//     selectedCourier: expect.any(String)
//   };

//   const mockOrderInfo = {
//     selectedCourier: 'Speedy'
//   };

//   afterAll(() => {
//     mongoose.disconnect();
//   });

//   test('Create new order with anonymous cartID', () => {
//     return request(app)
//       .post('/api/orders/')
//       .send(mockOrderInfo)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then((response) => {
//         expect(response.body).toEqual(
//           expect.objectContaining({
//             msg: 'Your order was created successfully, now you can wait for phone or email comfirmation from our team.'
//           }));
//       });
//   });
// });

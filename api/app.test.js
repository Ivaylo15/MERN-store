const request = require('supertest');
const app = require('./app');

// describe('give the product a title', () => {
//     test('should responde with 200 status code', async () => {
//         const response = await request(app).post('/products').send({
//             title: 'Jacket',
//             category: 'Test',
//             size: 'xs',
//             color: 'black',
//             price: 333,
//             image: 'test'
//         })
//         // expect(response.statusCode).toBe(200)
//         expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
//         expect(response.body).toEqual('Jacket');
//         done();
//     }, 15000)
// })
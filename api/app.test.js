const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const request = supertest(app);
const Product = require('./models/Product');

const products = [{
    title: 'Test',
    category: 'Test',
    size: 'Test',
    color: 'Test',
    price: 333,
    image: 'Test'
},
{
    title: 'Test1',
    category: 'Test2',
    size: 'Test3',
    color: 'Test4',
    price: 333,
    image: 'Test5'
}
]

beforeAll(async () => {
    const url = 'mongodb://localhost:27017/mern-store-api-tests'
    await mongoose.connect(url, { useNewUrlParser: true })
    await Product.create(products)
})

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

afterAll(async () => {
    await removeAllCollections()
})

describe('Test Get products from database', () => {
    test('should return up to 12 products', async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
        expect(response.body.results).toBeTruthy();
        expect(response.body.results.length).toBeLessThanOrEqual(12);
    })
}, 1500)

describe('Test Post product to database', () => {
    test('should responde with 200 status code', async () => {
        const response = await request.post('/products').send({
            title: 'Test',
            category: 'Test',
            size: 'xs',
            color: 'Test',
            price: 333,
            image: 'Test'
        })
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    }),
        test('should return true value', async () => {
            const response = await request.post('/products').send({
                title: 'Test',
                category: 'Test',
                size: 'xs',
                color: 'Test',
                price: 333,
                image: 'Test'
            })
            expect(response.body.title).toBeTruthy();
            expect(response.body.category).toBeTruthy();
            expect(response.body.size).toBeTruthy();
            expect(response.body.color).toBeTruthy();
            expect(response.body.price).toBeTruthy();
            expect(response.body.image).toBeTruthy();
        }),
        test('should return right type', async () => {
            const response = await request.post('/products').send({
                title: 'Test',
                category: 'Test',
                size: 'xs',
                color: 'Test',
                price: 333,
                image: 'Test'
            })
            expect(typeof response.body.title).toBe('string')
            expect(typeof response.body.category).toBe('string')
            expect(typeof response.body.size).toBe('string')
            expect(typeof response.body.color).toBe('string')
            expect(typeof response.body.price).toBe('number')
            expect(typeof response.body.image).toBe('string')
        })
}, 1500)

describe('Test Delete products from database', () => {
    test('should return 200', async () => {
        const result = await Product.findOne();
        const response = await request.delete(`/products/${result._id}`)
        expect(response.status).toBe(200)
    })
    test('should return error for invalid id', async () => {
        const response = await request.delete('/products/test')
        expect(response.status).toBe(500)
    })
}, 1500)
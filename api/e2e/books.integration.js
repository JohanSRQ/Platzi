// Integration Test
const request = require('supertest');
const createApp = require('../src/app');
const { generateManyBook } = require('../src/fake/bokk.fake');


const mockGetAll = jest.fn();  // Spie / pruebas de caja blanca

// Cuando se llame la libreria 
jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => { },
})));

describe('Test for bookst', () => {
    let app = null;
    let server = null;
    beforeAll(() => {
        app = createApp();
        server = app.listen(3001);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('test for [GET] /api/v1/books', () => {
        test('should return a list books', () => {
            // Arrange
            const fakeBooks = generateManyBook(3);
            mockGetAll.mockResolvedValue(fakeBooks);
            // Act
            return request(app)
                .get('/api/v1/books')
                .expect(200)
                .then(({ body }) => {
                    console.log(body);
                    // Assert
                    expect(body.length).toEqual(fakeBooks.length);
                });
        });
    });
});
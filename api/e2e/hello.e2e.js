// Configurando supertest en el API
const request = require('supertest');

const createApp = require('../src/app');

// Corremos y levantamos toda la aplicación.
describe('Test for hello endpoint', () => {
    let app = null;
    let server = null;
    beforeAll(() => {
        app = createApp();
        server = app.listen(3001);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('test for [GET] /', () => {
        test('should return "Hello World!!1"', () => {
            request(app)
                .get('/')
                .expect(200)
                .then(response => {
                    expect(response.text).toEqual('Hello World!!1')
                })
        });
    });
});
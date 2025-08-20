// Mocking
const { generateManyBook } = require('../fake/bokk.fake');
const BookService = require('./books.service');

// Fake //> informacion para rellenar o 
/*
const fakeBooks = [
    {
        _id: 1,
        name: 'Harry Potter',
    }
];*/
//> simular datos.

const mockGetAll = jest.fn();  // Spie / pruebas de caja blanca

/*
const MongoLibStub = {
    getAll: mockGetAll,
    create: () => { }
}
*/

// Cuando se llame la libreria 
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => { }
})));
//> genero una suplantacion.

describe('Test for BookService', () => {
    let service;
    beforeEach(() => {
        service = new BookService();
        jest.clearAllMocks(); // Siempre este limpiando el estado
    });

    describe('test for getBooks', () => {
        test('should return a list book', async () => {
            // Arrange
            const fakeBooks = generateManyBook(20);
            mockGetAll.mockResolvedValue(fakeBooks);
            // Act
            const books = await service.getBooks({});
            console.log(books);
            // Assert
            expect(books.length).toEqual(fakeBooks.length);
            expect(mockGetAll).toHaveBeenCalled();
            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith('books', {}); // Con que argumentos fue llamado

        });

        test('should return a list book otherwise', async () => {
            // Arrange
            const fakeBooks = generateManyBook(4);
            mockGetAll.mockResolvedValue(fakeBooks);
            // Act
            const books = await service.getBooks({});
            console.log(books);
            // Assert
            expect(books[0].name).toEqual(fakeBooks[0].name);
        });
    });
});
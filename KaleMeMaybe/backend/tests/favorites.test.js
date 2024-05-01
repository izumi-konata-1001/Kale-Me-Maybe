const request = require('supertest');
const app = require('../app.js');

jest.mock('../data/database', () => ({
  initializeDbConnection: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue([{}]),
    end: jest.fn()
  })
}));

jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn().mockResolvedValue({
    execute: jest.fn().mockResolvedValue([{}]),
    end: jest.fn()
  })
}));

jest.mock('../data/favorites-dao', () => ({
  getFavorites: jest.fn(),
  createCollection: jest.fn(),
  searchFavorites: jest.fn()
}));

const favDao = require('../data/favorites-dao');

describe('GET /favorites', () => {
  it('should fetch user favorites', async () => {
    const mockFavs = [{ id: 1, title: "Favorite Dish" }];
    favDao.getFavorites.mockResolvedValue(mockFavs);
    const response = await request(app)
      .get('/api/favorites')
      .set('userid', '123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockFavs);
  });

  it('should handle failures in fetching favorites', async () => {
    favDao.getFavorites.mockRejectedValue(new Error("Database error"));
    const response = await request(app)
      .get('/api/favorites')
      .set('userid', '123');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch favorites. " });
  });
});

describe('POST /favorites', () => {
  it('should create a collection', async () => {
    const mockCollections = { success: true, id: 1, name: "New Collection" };
    favDao.createCollection.mockResolvedValue(mockCollections);
    const response = await request(app)
      .post('/api/favorites')
      .send({ user: '123', name: 'New Collection' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCollections);
  });

  it('should handle failures in creating a collection', async () => {
    favDao.createCollection.mockRejectedValue(new Error("Creation failed"));
    const response = await request(app)
      .post('/api/favorites')
      .send({ user: '123', name: 'New Collection' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to create a collection. " });
  });
});

describe('GET /favorites/search', () => {
  it('should return search results', async () => {
    const mockResults = [{ id: 1, title: "Favorite Dish" }];
    favDao.searchFavorites.mockResolvedValue(mockResults);
    const response = await request(app)
      .get('/api/favorites/search?searchTerm=Dish')
      .set('userid', '123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResults);
  });

  it('should handle no results found', async () => {
    favDao.searchFavorites.mockResolvedValue([]);
    const response = await request(app)
      .get('/api/favorites/search?searchTerm=Unknown')
      .set('userid', '123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "No recipes found matching your search criteria." });
  });

  it('should handle failures in searching favorites', async () => {
    favDao.searchFavorites.mockRejectedValue(new Error("Search failed"));
    const response = await request(app)
      .get('/api/favorites/search?searchTerm=Dish')
      .set('userid', '123');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to search in collections. " });
  });
});

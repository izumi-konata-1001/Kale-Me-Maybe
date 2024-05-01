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

jest.mock('../data/history-ingredient-dao', () => ({
  getRecentSearchesByUserId: jest.fn()
}));

const { getRecentSearchesByUserId } = require('../data/history-ingredient-dao');

describe('GET /users/:userId/search-histories', () => {
  it('should retrieve unique search histories for a user', async () => {
    const mockSearches = [
      { id: 1, ingredients: [{ id: 1, name: "Tomato" }, { id: 2, name: "Basil" }] },
      { id: 2, ingredients: [{ id: 1, name: "Tomato" }, { id: 2, name: "Basil" }] },
      { id: 3, ingredients: [{ id: 3, name: "Garlic" }] }
    ];
    getRecentSearchesByUserId.mockResolvedValue(mockSearches);
    const response = await request(app).get('/api/users/123/search-histories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { id: 1, ingredients: [{ id: 1, name: "Tomato" }, { id: 2, name: "Basil" }] },
      { id: 3, ingredients: [{ id: 3, name: "Garlic" }] }
    ]);
  });

  it('should handle empty search histories', async () => {
    getRecentSearchesByUserId.mockResolvedValue([]);
    const response = await request(app).get('/api/users/123/search-histories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

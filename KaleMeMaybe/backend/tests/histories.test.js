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

jest.mock('../data/browsing-history-dao', () => ({
  getBrowsingHistory: jest.fn(),
  updateBrowsingHistory: jest.fn(),
  getRecipesWithIds: jest.fn()
}));

const broDao = require('../data/browsing-history-dao');

describe('GET /browsing', () => {
  const mockHistory = [
    { id: 1, userId: 1, url: 'http://example.com', timestamp: new Date().toISOString() },
    { id: 2, userId: 1, url: 'http://example.org', timestamp: new Date().toISOString() }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the browsing history for a valid user ID', async () => {
    broDao.getBrowsingHistory.mockResolvedValue(mockHistory);
    const userId = 1;
    const response = await request(app).get(`/api/browsing?id=${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockHistory);
  });
});

describe('POST /updatebro', () => {
  it('should update browsing history for existing user', async () => {
    broDao.updateBrowsingHistory.mockResolvedValue();
    const postData = {
      hasUserId: false,
      userId: 1,
      recipeId: 1
    };
    const response = await request(app).post('/api/updatebro').send(postData);
    expect(response.statusCode).toBe(200);
  }, 1000);
});

describe('POST /clearRecipeIds', () => {
  it('should clear all stored recipe IDs', async () => {
    const response = await request(app).post('/api/clearRecipeIds');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Recipe IDs cleared successfully");
  });
});

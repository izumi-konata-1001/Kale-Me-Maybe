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

jest.mock('../data/ingredient-dao', () => ({
  queryIngredients: jest.fn()
}));

const { queryIngredients } = require('../data/ingredient-dao');

describe('GET /ingredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch ingredients by prefix', async () => {
    const mockIngredients = [{ id: 1, name: "Salt" }, { id: 2, name: "Sugar" }];
    queryIngredients.mockResolvedValue(mockIngredients);
    const response = await request(app).get('/api/ingredients?prefix=s');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockIngredients);
  });

  it('should return 404 if no ingredients found', async () => {
    queryIngredients.mockResolvedValue([]);
    const response = await request(app).get('/api/ingredients?prefix=z');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "No ingredients found." });
  });

  it('should return 400 if prefix query parameter is missing', async () => {
    const response = await request(app).get('/api/ingredients');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Prefix query parameter is required");
  });

  it('should handle errors during fetching ingredients', async () => {
    queryIngredients.mockRejectedValue(new Error("Database error"));
    const response = await request(app).get('/api/ingredients?prefix=s');
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Error fetching ingredients");
  });
});

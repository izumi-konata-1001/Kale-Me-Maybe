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

jest.mock('../data/score-dao', () => ({
  updateUserRating: jest.fn(),
  getAverageScore: jest.fn()
}));

const { updateUserRating, getAverageScore } = require('../data/score-dao');

describe('POST /score', () => {
  it('should update user rating', async () => {
    const mockResult = { success: true, message: "Rating updated successfully." };
    updateUserRating.mockResolvedValue(mockResult);
    const response = await request(app)
      .post('/api/score')
      .send({ userId: '123', recipeId: '1', score: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResult);
  });

  it('should handle failures during update', async () => {
    updateUserRating.mockRejectedValue(new Error("Update failed"));
    const response = await request(app)
      .post('/api/score')
      .send({ userId: '123', recipeId: '1', score: 5 });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Failed to update the score due to internal error." });
  });
});

describe('GET /score/average/:recipeId', () => {
  it('should retrieve average score for a recipe', async () => {
    const mockAverage = { average: 4.5 };
    getAverageScore.mockResolvedValue(mockAverage);
    const response = await request(app).get('/api/score/average/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockAverage);
  });

  it('should handle failures in retrieving average score', async () => {
    getAverageScore.mockRejectedValue(new Error("Retrieval failed"));
    const response = await request(app).get('/api/score/average/1');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Failed to retrieve the average score." });
  });
});

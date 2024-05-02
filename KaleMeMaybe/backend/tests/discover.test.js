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

jest.mock('../data/recipe-dao', () => ({
  getAllRecipes: jest.fn(),
  getRecipesSortedByTimeConsuming: jest.fn(),
  getRecipesSortedByDifficulty: jest.fn(),
  getRecipesSortedByAverageScore: jest.fn(),
  getRecipesSortedByPopularity: jest.fn(),
  removeRecipeFromFavourites: jest.fn()
}));

const recipeDao = require('../data/recipe-dao');

describe('GET /recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all recipes without any sorting', async () => {
    const mockRecipes = [{ id: 1, name: "Pasta" }, { id: 2, name: "Burger" }];
    recipeDao.getAllRecipes.mockResolvedValue(mockRecipes);
    const response = await request(app).get(`/api/discover?userId=1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ recipes: mockRecipes });
  });

  it('should fetch recipes sorted by time', async () => {
    const mockRecipes = [{ id: 1, name: "Pasta", time: 30 }];
    recipeDao.getRecipesSortedByTimeConsuming.mockResolvedValue(mockRecipes);
    const response = await request(app).get(`/api/discover?sort=time&direction=asc&userId=1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ recipes: mockRecipes });
  });

  it('should fetch recipes sorted by difficulty', async () => {
    const mockRecipes = [{ id: 1, name: "Burger", difficulty: "Hard" }];
    recipeDao.getRecipesSortedByDifficulty.mockResolvedValue(mockRecipes);
    const response = await request(app).get(`/api/discover?sort=difficulty&direction=desc&userId=1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ recipes: mockRecipes });
  });

  it('should handle errors during fetching recipes', async () => {
    recipeDao.getAllRecipes.mockRejectedValue(new Error("Database error"));
    const response = await request(app).get(`/api/discover?userId=1`);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch data" });
  });
});

describe('DELETE /recipes/remove-favourite', () => {
  it('should remove a recipe from favourites', async () => {
    recipeDao.removeRecipeFromFavourites.mockResolvedValue();
    const response = await request(app)
      .delete(`/api/discover/remove-favourite`)
      .send({ userId: 1, recipeId: 1 });
    expect(response.statusCode).toBe(204);
  });

  it('should handle errors during removing recipe from favourites', async () => {
    recipeDao.removeRecipeFromFavourites.mockRejectedValue(new Error("Database error"));
    const response = await request(app)
      .delete(`/api/discover/remove-favourite`)
      .send({ userId: 1, recipeId: 1 });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to remove recipe from favourites" });
  });
});


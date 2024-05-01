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

jest.mock('../data/ai-recipe-generator', () => ({
  generateRecipeWithIngredients: jest.fn(),
  generateRecipeImage: jest.fn()
}));

jest.mock('../data/recipe-dao', () => ({
  retrieveRecipeById: jest.fn(),
  insertRecipeAndSearchHistory: jest.fn()
}));

const { generateRecipeWithIngredients, generateRecipeImage } = require('../data/ai-recipe-generator');
const { retrieveRecipeById, insertRecipeAndSearchHistory } = require('../data/recipe-dao');

describe('GET /health', () => {
  it('should check API health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("API is healthy!");
  });
});

describe('POST /recipes', () => {
  it('should generate a recipe given ingredients', async () => {
    const mockRecipeData = '{"name":"Tomato Soup","instructions":"Boil tomatoes"}';
    const mockImagePath = "/path/to/image.jpg";
    const mockRecipeId = 1;
    generateRecipeWithIngredients.mockResolvedValue(mockRecipeData);
    generateRecipeImage.mockResolvedValue(mockImagePath);
    insertRecipeAndSearchHistory.mockResolvedValue(mockRecipeId);

    const response = await request(app)
      .post('/api/recipes')
      .send({ ingredients: [{ name: 'Tomato' }], user_id: '123', existing_recipe_name: 'Soup' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      recipeId: mockRecipeId,
      recipe: JSON.parse(mockRecipeData),
      image_path: mockImagePath
    });
  });

  it('should return 400 if ingredients list is empty', async () => {
    const response = await request(app)
      .post('/api/recipes')
      .send({ ingredients: [] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Ingredients list is required and cannot be empty." });
  });

  it('should handle errors during recipe generation', async () => {
    generateRecipeWithIngredients.mockRejectedValue(new Error("Failed to generate recipe"));
    const response = await request(app)
      .post('/api/recipes')
      .send({ ingredients: [{ name: 'Tomato' }], user_id: '123' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to generate." });
  });
});

describe('GET /recipe/:id', () => {
  it('should fetch recipe by id', async () => {
    const mockRecipe = { recipe: { id: 1, name: "Tomato Soup" }, ingredients: [{ name: "Tomato" }] };
    retrieveRecipeById.mockResolvedValue(mockRecipe);
    const response = await request(app).get('/api/recipe/1').set('userid', '123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockRecipe);
  });

  it('should return 404 if recipe not found', async () => {
    retrieveRecipeById.mockResolvedValue({});
    const response = await request(app).get('/api/recipe/999').set('userid', '123');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Recipe not found" });
  });

  it('should handle errors during fetching recipe by id', async () => {
    retrieveRecipeById.mockRejectedValue(new Error("Database error"));
    const response = await request(app).get('/api/recipe/1').set('userid', '123');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch recipe." });
  });
});

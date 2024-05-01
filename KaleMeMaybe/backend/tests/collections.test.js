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

jest.mock('../data/collection-recipe-dao', () => ({
  retriveCollection: jest.fn(),
  deleteCollection: jest.fn(),
  addRecipeToCollection: jest.fn(),
  renameCollection: jest.fn(),
  batchDeletion: jest.fn()
}));

const collectionDao = require('../data/collection-recipe-dao');

describe('GET /:userid/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the collection details', async () => {
    const mockCollection = { name: "Desserts", recipes: [{ id: 1, title: "Chocolate Cake" }] };
    collectionDao.retriveCollection.mockResolvedValue(mockCollection);
    const response = await request(app).get(`/api/collection/1/100`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCollection);
  });

  it('should handle empty collections', async () => {
    const mockEmptyCollection = { name: "Desserts", recipes: [] };
    collectionDao.retriveCollection.mockResolvedValue(mockEmptyCollection);
    const response = await request(app).get(`/api/collection/1/100`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "There is nothing here yet.", name: "Desserts" });
  });

  it('should handle errors', async () => {
    collectionDao.retriveCollection.mockRejectedValue(new Error("Database failure"));
    const response = await request(app).get(`/api/collection/1/100`);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to retrive collection details. " });
  });
});

describe('DELETE /:userid/:id', () => {
  it('should delete a collection successfully', async () => {
    collectionDao.deleteCollection.mockResolvedValue(1); 
    const response = await request(app).delete(`/api/collection/1/100`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: "Collection deleted successfully." });
  });

  it('should handle deletions of non-existing collections', async () => {
    collectionDao.deleteCollection.mockResolvedValue(0);
    const response = await request(app).delete(`/api/collection/1/100`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      fail: "No collection found to delete or collection does not belong to the user."
    });
  });
});

describe('POST /:userid/:id', () => {
  it('should add a recipe to a collection', async () => {
    const addResult = { success: true };
    collectionDao.addRecipeToCollection.mockResolvedValue(addResult);
    const response = await request(app)
      .post(`/api/collection/1/100`)
      .send({ recipeId: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Recipe successfully added to collection." });
  });

  it('should return error for missing recipeId', async () => {
    const response = await request(app)
      .post(`/api/collection/1/100`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Missing recipeId in request body." });
  });
});

describe('PUT /:userid/:id', () => {
  it('should rename a collection successfully', async () => {
    collectionDao.renameCollection.mockResolvedValue({ success: true });
    const response = await request(app)
      .put(`/api/collection/1/100`)
      .send({ name: "New Name" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Renamed collection." });
  });

  it('should handle failure in renaming', async () => {
    collectionDao.renameCollection.mockResolvedValue({ success: false });
    const response = await request(app)
      .put(`/api/collection/1/100`)
      .send({ name: "New Name" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Failed to rename collection." });
  });
});

describe('DELETE /:userid/:id/batch', () => {
  it('should handle batch deletions', async () => {
    collectionDao.batchDeletion.mockResolvedValue();
    const response = await request(app)
      .delete(`/api/collection/1/100/batch`)
      .send({ recipeIds: [1, 2, 3] });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Batch deletion completed." });
  });
});

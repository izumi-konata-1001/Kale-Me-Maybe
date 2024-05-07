jest.mock('../data/database');
const db = require('../data/database');
const {
  getFavorites,
  createCollection,
  searchFavorites
} = require('../data/favorites-dao');

describe('Favorites DAO', () => {
  beforeEach(() => {
    db.query.mockClear();
  });

  describe('getFavorites', () => {
    it('retrieves favorite collections for a user', async () => {
      const mockData = [{
        id: 1,
        CollectionName: 'Desserts',
        RecipeCount: 5,
        LatestRecipeImagePath: '/path/to/image.jpg',
        CollectionUpdatedAt: new Date().toISOString()
      }];
      db.query.mockResolvedValue([mockData]);

      const result = await getFavorites(1);
      expect(result).toEqual(mockData);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });
  });

  describe('createCollection', () => {
    it('creates a new collection and retrieves updated favorites', async () => {
      db.query.mockResolvedValueOnce([[{ id: 1 }]]);  
      db.query.mockResolvedValueOnce([]);  
      db.query.mockResolvedValueOnce([[{ id: 1, CollectionName: 'New Collection' }]]);  

      const result = await createCollection(1, 'New Collection');
      expect(result).toEqual([{ id: 1, CollectionName: 'New Collection' }]);
    });

    it('throws an error if user does not exist', async () => {
      db.query.mockResolvedValueOnce([[]]);  

      await expect(createCollection(1, 'New Collection')).rejects.toThrow("User does not exist");
    });
  });

  describe('searchFavorites', () => {
    it('searches within user\'s favorite recipes', async () => {
      const mockResults = [{
        id: 101,
        name: 'Chocolate Cake',
        favouriteState: true
      }];
      db.query.mockResolvedValueOnce([[{ id: 1 }]]);  
      db.query.mockResolvedValueOnce([mockResults]);  

      const results = await searchFavorites(1, 'chocolate');
      expect(results).toEqual(mockResults);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 'chocolate', 'chocolate', 'chocolate']);
    });

    it('throws an error if user does not exist during search', async () => {
      db.query.mockResolvedValueOnce([[]]);  

      await expect(searchFavorites(1, 'chocolate')).rejects.toThrow("User does not exist");
    });
  });
});

jest.mock('../data/database');  

const { getBrowsingHistory, updateBrowsingHistory, getRecipesWithIds } = require('../data/browsing-history-dao');
const db = require('../data/database');

describe('Browsing History DAO', () => {
  beforeEach(() => {
    db.execute.mockClear();
    db.query.mockClear();
  });

  describe('getBrowsingHistory', () => {
    it('should fetch browsing history for a user', async () => {
      const mockHistory = [{ recipe_id: 101, name: 'Pasta' }];
      db.execute.mockResolvedValue([mockHistory, []]); 
      const userId = 1;
      const result = await getBrowsingHistory(userId);
      expect(result).toEqual(mockHistory);
      expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT DISTINCT'), [userId, userId]);
    });
  });

  describe('updateBrowsingHistory', () => {
    it('should insert or update browsing history for a user', async () => {
      db.execute.mockResolvedValue([{}, {}]); 
      const userId = 1;
      const recipeId = 101;
      await updateBrowsingHistory(userId, recipeId);
      expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('REPLACE INTO browsing_history'), [userId, recipeId]);
    });
  });

  describe('getRecipesWithIds', () => {
    it('should retrieve recipes based on provided IDs', async () => {
      const mockRecipes = [{ recipe_id: 101, name: 'Pasta' }];
      db.query.mockResolvedValue([mockRecipes, []]); 
      const recipeIds = [101, 102, 103];
      const result = await getRecipesWithIds(recipeIds);
      expect(result).toEqual(mockRecipes);
      expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT id AS recipe_id'), recipeIds);
    });
  });
});

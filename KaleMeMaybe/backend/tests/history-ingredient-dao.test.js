jest.mock('../data/database');
const db = require('../data/database');
const { getRecentSearchesByUserId } = require('../data/history-ingredient-dao');

describe('History Ingredient DAO', () => {
  beforeEach(() => {
    db.execute.mockClear();
  });

  describe('getRecentSearchesByUserId', () => {
    it('retrieves recent searches correctly formatted', async () => {
      const mockData = [
        { search_id: 1, created_at: '2023-01-01T00:00:00.000Z', ingredient_id: 101, ingredient_name: 'Sugar' },
        { search_id: 1, created_at: '2023-01-01T00:00:00.000Z', ingredient_id: 102, ingredient_name: 'Flour' }
      ];
      db.execute.mockResolvedValue([mockData]);

      const results = await getRecentSearchesByUserId(1);
      expect(results).toEqual([{
        searchId: 1,
        createdAt: '2023-01-01T00:00:00.000Z',
        ingredients: [
          { id: 101, name: 'Sugar' },
          { id: 102, name: 'Flour' }
        ]
      }]);
      expect(db.execute).toHaveBeenCalled();
    });

    it('handles empty results', async () => {
      db.execute.mockResolvedValue([[]]);

      const results = await getRecentSearchesByUserId(1);
      expect(results).toEqual([]);
      expect(db.execute).toHaveBeenCalled();
    });

    it('throws an error on database failure', async () => {
      const errorMessage = "Failed to retrieve recent searches from the database";
      db.execute.mockRejectedValue(new Error(errorMessage));

      await expect(getRecentSearchesByUserId(1)).rejects.toThrow(errorMessage);
    });
  });
});

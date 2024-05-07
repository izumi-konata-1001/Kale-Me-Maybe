jest.mock('../data/database');
const db = require('../data/database');
const { queryIngredients } = require('../data/ingredient-dao');

describe('Ingredient DAO', () => {
  beforeEach(() => {
    db.execute.mockClear();
  });

  describe('queryIngredients', () => {
    it('queries ingredients by prefix and returns sorted results', async () => {
      const mockIngredients = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Apricot' }
      ];
      db.execute.mockResolvedValue([mockIngredients]);

      const prefix = "Ap";
      const results = await queryIngredients(prefix);
      expect(results).toEqual([mockIngredients]);
    });

    it('returns an empty array when no ingredients match the prefix', async () => {
      db.execute.mockResolvedValue([[]]);

      const results = await queryIngredients("xyz");
      expect(results).toEqual([[]]);
      expect(db.execute).toHaveBeenCalled();
    });

    it('throws an error when the database query fails', async () => {
      const error = new Error("Database error");
      db.execute.mockRejectedValue(error);

      await expect(queryIngredients("Ap")).rejects.toThrow("Database error");
    });
  });
});

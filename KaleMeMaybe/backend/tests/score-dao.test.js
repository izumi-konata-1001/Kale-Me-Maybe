const { updateUserRating, getAverageScore } = require('../data/score-dao');
const db = require('../data/database');

jest.mock('../data/database');

describe('Score DAO Tests', () => {
  describe('updateUserRating', () => {
    it('should update the user rating for a recipe', async () => {
      db.execute.mockResolvedValueOnce(); // Mock successful execution

      const userId = 1;
      const recipeId = 100;
      const score = 4;

      const result = await updateUserRating(userId, recipeId, score);

      expect(result).toEqual({ message: "Rating updated successfully" });
      expect(db.execute).toHaveBeenCalledWith(expect.anything()); // Ensure db.execute was called
    });

    it('should throw an error if rating update fails', async () => {
      db.execute.mockRejectedValueOnce(new Error("Failed to update rating.")); // Mock failure

      const userId = 1;
      const recipeId = 100;
      const score = 4;

      await expect(updateUserRating(userId, recipeId, score)).rejects.toThrow("Failed to update rating.");
    });
  });

  describe('getAverageScore', () => {
    it('should retrieve the average score for a recipe', async () => {
      const mockAverageScore = 4.2;
      const mockRows = [{ averageScore: mockAverageScore }];

      db.execute.mockResolvedValueOnce([mockRows]); // Mock successful execution

      const recipeId = 100;
      const result = await getAverageScore(recipeId);

      expect(result).toEqual({ averageScore: "4.2" }); // Ensure the average score is correctly formatted
      expect(db.execute).toHaveBeenCalledWith(expect.anything()); // Ensure db.execute was called
    });

    it('should handle when average score is not available', async () => {
      const mockRows = [{ averageScore: null }];

      db.execute.mockResolvedValueOnce([mockRows]); // Mock successful execution

      const recipeId = 100;
      const result = await getAverageScore(recipeId);

      expect(result).toEqual({ averageScore: "0.0" }); // Ensure the default score is returned
      expect(db.execute).toHaveBeenCalledWith(expect.anything()); // Ensure db.execute was called
    });

    it('should throw an error if retrieval fails', async () => {
      db.execute.mockRejectedValueOnce(new Error("Failed to retrieve average score.")); // Mock failure

      const recipeId = 100;
      await expect(getAverageScore(recipeId)).rejects.toThrow("Failed to retrieve average score.");
    });
  });
});

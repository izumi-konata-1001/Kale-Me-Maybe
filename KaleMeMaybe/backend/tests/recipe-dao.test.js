jest.mock('../data/database');
const db = require('../data/database');
const {
  getAllRecipes,
  retrieveRecipeById,
  insertRecipeAndSearchHistory,
  removeRecipeFromFavourites,
  getRecipesSortByDifficultyAsc,
  getRecipesSortByDifficultyDesc,
  addAverageScore,
  addPopularity,
  getAllCollections,
  getFavouriteRecipe,
} = require('../data/recipe-dao');

describe('Recipe DAO', () => {
  beforeEach(() => {
    db.query.mockClear();
    db.execute.mockClear();
    db.beginTransaction.mockClear();
    db.commit.mockClear();
    db.rollback.mockClear();
  });

  describe('getAllRecipes', () => {
    it('fetches all recipes from the database', async () => {
      const mockRecipes = [{ id: 1, name: 'Lasagna' }, { id: 2, name: 'Tiramisu' }];
      db.query.mockResolvedValue([mockRecipes]);

      const recipes = await getAllRecipes();
      expect(recipes).toEqual(mockRecipes);
      expect(db.query).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('retrieveRecipeById', () => {
    it('retrieves a recipe by id and checks if it is favorited by a specific user', async () => {
      db.query.mockResolvedValueOnce([[{ id: 1, name: 'Lasagna' }]]);
      db.query.mockResolvedValueOnce([[{ recipe_id: 1 }]]); 

      const recipeDetails = await retrieveRecipeById(1, 1);
      expect(recipeDetails).toEqual({ isFavorited: true, recipe: { id: 1, name: 'Lasagna' } });
      expect(db.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('insertRecipeAndSearchHistory', () => {
    it('rolls back transaction on failure', async () => {
      db.beginTransaction.mockResolvedValue();
      db.execute.mockRejectedValue(new Error("Insert failed"));
      db.rollback.mockResolvedValue();

      await expect(insertRecipeAndSearchHistory({ recipe_name: 'New Recipe' }, '/path/to/image.jpg', 1, [{ id: 101, name: 'Sugar' }])).rejects.toThrow("Cannot read properties of undefined (reading 'replace')");
      expect(db.rollback).toHaveBeenCalled();
    });
  });

  describe('removeRecipeFromFavourites', () => {
    it('removes a recipe from user\'s favourites', async () => {
      db.query.mockResolvedValue({ affectedRows: 1 });

      await removeRecipeFromFavourites(1, 100);
      expect(db.query).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('getRecipesSortByDifficultyAsc', () => {
    it('fetches all recipes sorted by difficulty ascending', async () => {
      const mockRecipes = [
        { id: 1, name: 'Omelette', difficulty: 'easy' },
        { id: 2, name: 'Beef Stroganoff', difficulty: 'medium' }
      ];
      db.query.mockResolvedValue([mockRecipes]);

      const recipes = await getRecipesSortByDifficultyAsc();
      expect(recipes).toEqual(mockRecipes);
    });
  });

  describe('getRecipesSortByDifficultyDesc', () => {
    it('fetches all recipes sorted by difficulty descending', async () => {
      const mockRecipes = [
        { id: 1, name: 'Beef Stroganoff', difficulty: 'hard' },
        { id: 2, name: 'Omelette', difficulty: 'easy' }
      ];
      db.query.mockResolvedValue([mockRecipes]);

      const recipes = await getRecipesSortByDifficultyDesc();
      expect(recipes).toEqual(mockRecipes);
    });
  });

  describe('addAverageScore', () => {
    it('fetches recipes with their average scores', async () => {
      const mockRecipes = [
        { id: 1, name: 'Pancakes', averageScore: 4.5 },
        { id: 2, name: 'Waffles', averageScore: 4.0 }
      ];
      db.query.mockResolvedValue([mockRecipes]);

      const recipes = await addAverageScore();
      expect(recipes).toEqual(mockRecipes);
      expect(db.query).toHaveBeenCalledWith(expect.stringContaining('AVG(IFNULL(s.score, NULL)) AS averageScore'));
    });
  });

  describe('addPopularity', () => {
    it('fetches recipes augmented with popularity', async () => {
      const mockRecipes = [
        { id: 1, name: 'Pancakes', popularity: 10 },
        { id: 2, name: 'Waffles', popularity: 5 }
      ];
      db.query.mockResolvedValue([mockRecipes]);

      const recipes = await addPopularity();
      expect(recipes).toEqual(mockRecipes);
      expect(db.query).toHaveBeenCalledWith(expect.stringContaining('COALESCE(c.popularity, 0) AS popularity'));
    });
  });

  describe('getAllCollections', () => {
    it('fetches all collections for a user', async () => {
      const mockCollections = [
        { id: 1, name: 'Breakfast Ideas' },
        { id: 2, name: 'Healthy Snacks' }
      ];
      db.query.mockResolvedValue([mockCollections]);

      const collections = await getAllCollections(1);
      expect(collections).toEqual(mockCollections);
    });
  });

  describe('getFavouriteRecipe', () => {
    it('fetches favourite recipes based on collection ids', async () => {
      const collections = [{ id: 1 }, { id: 2 }];
      const expectedRecipeIds = [101, 102];

      db.query.mockResolvedValue([[{ recipe_id: 101 }, { recipe_id: 102 }]]);

      const recipeIds = await getFavouriteRecipe(collections);
      expect(recipeIds).toEqual(expectedRecipeIds);
      expect(db.query).toHaveBeenCalledWith(expect.any(String));
    });

    it('returns an empty array when given an empty collection array', async () => {
      const recipeIds = await getFavouriteRecipe([]);
      expect(recipeIds).toEqual([]);
    });
  });

});


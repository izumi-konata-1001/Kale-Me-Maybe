const express = require("express");
const router = express.Router();
const recipeDao = require("../data/recipe-dao.js");

router.post('/history', async (req, res) => {
  console.log("in backend");
  try {
    const recipeIds = req.body.recipeIds;
    console.log('Received recipeIds:', recipeIds);

    if (!recipeIds || !Array.isArray(recipeIds)) {
      return res.status(400).json({ error: "Invalid request: recipeIds is required and should be an array" });
    }

    // Fetch recipes by IDs
    const recipes = await Promise.all(recipeIds.map(async (recipeId) => {
      try {
        const recipe = await recipeDao.getRecipeById(recipeId);
        return recipe;
      } catch (error) {
        console.error(`Error fetching recipe with ID ${recipeId}:`, error);
        return null;  // Return null if there's an error fetching this recipe
      }
    }));

    // Filter out any null values in the recipes array
    const validRecipes = recipes.filter(recipe => recipe !== null);

    res.status(200).json({ recipes: validRecipes });
  } catch (error) {
    console.error("Error fetching recipes by IDs:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

module.exports = router;

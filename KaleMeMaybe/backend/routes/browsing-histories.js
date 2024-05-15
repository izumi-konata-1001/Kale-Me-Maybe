const express = require("express");
const router = express.Router();
const recipeDao = require("../data/recipe-dao.js");
const historyDao = require("../data/history-dao.js");

router.post("/history", async (req, res) => {
  console.log("in backend");
  try {
    const { recipeIds, userId } = req.body;

    if (recipeIds && Array.isArray(recipeIds)) {
      console.log("Received recipeIds:", recipeIds);

      // Fetch recipes by IDs
      const recipes = await Promise.all(
        recipeIds.map(async (recipeId) => {
          try {
            const recipe = await recipeDao.getRecipeById(recipeId);
            return recipe;
          } catch (error) {
            console.error(`Error fetching recipe with ID ${recipeId}:`, error);
            return null; // Return null if there's an error fetching this recipe
          }
        })
      );

      // Filter out any null values in the recipes array
      const validRecipes = recipes.filter((recipe) => recipe !== null);

      res.status(200).json({ recipes: validRecipes });
    } else if (userId) {
      console.log("Received userId:", userId);

      // Fetch all recipes in user's browsing history
      try {
        const recipeIds = await historyDao.getBrowsingHistory(userId);
        console.log("recipeIdArray: " + recipeIds);

        const recipes = await Promise.all(
          recipeIds.map(async (recipeId) => {
            try {
              const recipe = await recipeDao.getRecipeById(recipeId);
              return recipe;
            } catch (error) {
              console.error(
                `Error fetching recipe with ID ${recipeId}:`,
                error
              );
              return null; // Return null if there's an error fetching this recipe
            }
          })
        );
        const validRecipes = recipes.filter((recipe) => recipe !== null);

        res.status(200).json({ recipes: validRecipes });
      } catch (error) {
        console.error(
          `Error fetching browsing history for user with ID ${userId}:`,
          error
        );
        res.status(500).json({ error: "Error fetching browsing history" });
      }
    } else {
      res.status(400).json({ error: "Invalid request payload" });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

module.exports = router;

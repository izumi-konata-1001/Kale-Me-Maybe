const express = require("express");
const router = express.Router();
const recipeDao = require("../data/recipe-dao.js");
const historyDao = require("../data/history-dao.js");

router.post("/history", async (req, res) => {
  try {
    const { recipeIds, userId } = req.body;

    if (recipeIds && Array.isArray(recipeIds)) {

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

      // Fetch all recipes in user's browsing history
      try {
        const recipeIds = await historyDao.getBrowsingHistory(userId);

        const recipes = await Promise.all(
          recipeIds.map(async (recipeId) => {
            try {
              const recipe = await recipeDao.getRecipeWithFavouriteState(userId, recipeId);
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

router.delete("/deleteAllHistory", async (req, res) => {
  console.log("in delete history");
  try {
    const userId  = req.body.userId;
    if (userId) {
      console.log("Received userId for deletion:", userId);

      // Delete all browsing history for the user
      await historyDao.deleteAllBrowsingHistory(userId);
      res.status(200).json({ message: "Browsing history deleted successfully" });
    } else {
      res.status(400).json({ error: "User ID is required" });
    }
  } catch (error) {
    console.error(`Error deleting browsing history for user with ID ${userId}:`, error);
    res.status(500).json({ error: "Error deleting browsing history" });
  }
});

router.post("/addBrowsingHistory", async (req, res) => {
  try {
    const { userId, id, timestamp } = req.body;
    if (!userId || !id || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    await historyDao.addBrowsingHistory(userId, id, timestamp);
    res.status(200).json({ message: "Browsing history added successfully" });
  } catch (error) {
    console.error("Error adding browsing history:", error);
    res.status(500).json({ error: "Failed to add browsing history" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const historyDao = require("../data/history-dao.js");
const recipeDao = require("../data/recipe-dao.js");

router.get("/browsingHistory", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const recipeIdArray = await historyDao.getBrowsingHistory(userId);
    const recipes = await recipeDao.getRecipesByIds(recipeIdArray);
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching browsing history:", error);
    res.status(500).json({ error: "Failed to fetch browsing history" });
  }
});

router.post("/browsingHistory", async (req, res) => {
  try {
    const { recipeIds } = req.body;

    if (!recipeIds || !Array.isArray(recipeIds)) {
      return res.status(400).json({ error: "Invalid request: recipeIds is required and should be an array" });
    }

    const recipes = await recipeDao.getRecipesByIds(recipeIds);
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes by IDs:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

module.exports = router;

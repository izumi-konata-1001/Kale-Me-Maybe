const express = require("express");
const router = express.Router();
const broDao = require("../data/browsing-history-dao.js");
let recipeIds = [];

router.get("/browsing", async (req, res) => {

  const user_id = req.query.id;
  try {
    const history = await broDao.getBrowsingHistory(user_id);
    if (history) {
      res.status(200).json(history);
    } else {
      res.status(404).json({ error: "Browsing histories are not found." });
    }
  } catch (error) {
    console.error("Error fetching Browsing history:", error);
    res.status(500).json({ error: "Failed to fetch Browsing histories." });
  }
});

router.post("/updatebro", async (req, res) => {
  const { hasUserId, userId, recipeId } = req.body;

  try {
    if (hasUserId) {
      await broDao.updateBrowsingHistory(userId, recipeId);
    } else {
      recipeIds.push(recipeId);
      const local_recipes = await broDao.getRecipesWithIds(recipeIds);
      res.status(200).json(local_recipes);
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/clearRecipeIds", (req, res) => {
  recipeIds = [];
  res.status(200).send("Recipe IDs cleared successfully");
});

module.exports = router;

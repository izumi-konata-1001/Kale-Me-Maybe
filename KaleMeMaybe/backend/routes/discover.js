const express = require("express");
const router = express.Router();
const recipeDao = require("../data/recipe-dao.js");

router.get("/", async (req, res) => {
  try {
    const { sort, direction, userId } = req.query;
    let recipes = [];
    if (sort == "time") {
      if (direction != "")
        recipes = await recipeDao.getRecipesSortedByTimeConsuming(
          direction,
          userId
        );
      else recipes = await recipeDao.getAllRecipes(userId);
    } else if (sort == "difficulty") {
      if (direction != "")
        recipes = await recipeDao.getRecipesSortedByDifficulty(
          direction,
          userId
        );
      else recipes = await recipeDao.getAllRecipes(userId);
    } else if (sort == "rate") {
      if (direction != "")
        recipes = await recipeDao.getRecipesSortedByAverageScore(
          direction,
          userId
        );
      else recipes = await recipeDao.getAllRecipes(userId);
    } else if (sort == "popularity") {
      if (direction != "")
        recipes = await recipeDao.getRecipesSortedByPopularity(
          direction,
          userId
        );
      else recipes = await recipeDao.getAllRecipes(userId);
    } else recipes = await recipeDao.getAllRecipes(userId);
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.delete("/remove-favourite", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    await recipeDao.removeRecipeFromFavourites(userId, recipeId);
    res.status(204).end();
  } catch (error) {
    console.error("Failed to remove recipe from favourites:", error);
    res.status(500).json({ error: "Failed to remove recipe from favourites" });
  }
});
module.exports = router;

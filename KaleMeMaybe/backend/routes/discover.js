const express = require("express");
const router = express.Router();
const recipeDao = require("../data/recipe-dao.js");

router.get("/", async (req, res) => {
  try {
    const { sort, direction, userId } = req.query;
    let recipes = [];
    if (sort == "time") {
      if (direction != ""){
        recipes = await recipeDao.getAllRecipes();
        if (direction == "asc"){
          recipes = getRecipesSortByTimeAsc(recipes);
        }
        else if (direction == "desc")
          recipes = getRecipesSortByTimeDesc(recipes);
      }
      else 
        recipes = await recipeDao.getAllRecipes();
    } else if (sort == "difficulty") {
      if (direction != "")
      {
        if (direction == "asc")
          recipes = await recipeDao.getRecipesSortByDifficultyAsc();
        else if (direction == "desc")
          recipes = await recipeDao.getRecipesSortByDifficultyDesc();
      }
      else 
        recipes = await recipeDao.getAllRecipes();
    } else if (sort == "rate") {
      recipes = await recipeDao.addAverageScore();
      if (direction != "")
      {
        if (direction == "asc"){
          recipes = getRecipesSortByRateAsc(recipes);}
        else if (direction == "desc")
          recipes = getRecipesSortByRateDesc(recipes);
      }
      else 
        recipes = await recipeDao.getAllRecipes();
    } else if (sort == "popularity") {
      recipes = await recipeDao.addPopularity();
      if (direction != "")
      {
        if (direction == "asc")
          recipes = getRecipesSortByPopularityAsc(recipes);
        else if (direction == "desc")
          recipes = getRecipesSortByPopularityDesc(recipes);
      }
      else 
        recipes = await recipeDao.getAllRecipes();
    } 
    else
      recipes = await recipeDao.getAllRecipes();
    if (userId !== undefined && userId !== null && userId !== "")
    {
      const collections = await recipeDao.getAllCollections(userId);
      const favouriteRecipeIdArray = await recipeDao.getFavouriteRecipe(collections);
      recipes = markFavouriteState(recipes, favouriteRecipeIdArray)
    }
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

function getRecipesSortByTimeAsc(recipes) {

  const sortedRecipes = recipes.sort((a, b) => {
    const consumeTimeA = parseInt(a.time_consuming);
    const consumeTimeB = parseInt(b.time_consuming);
    if (consumeTimeA !== consumeTimeB) {
      return consumeTimeA - consumeTimeB;
    }

    const createdAtA = new Date(a.created_at);
    const createdAtB = new Date(b.created_at);
    return createdAtB - createdAtA;
  });

  return sortedRecipes;
}

function getRecipesSortByTimeDesc(recipes) {

  const sortedRecipes = recipes.sort((a, b) => {
    const consumeTimeA = parseInt(a.time_consuming); 
    const consumeTimeB = parseInt(b.time_consuming);
    if (consumeTimeA !== consumeTimeB) {
      return consumeTimeB - consumeTimeA;
    }

    const createdAtA = new Date(a.created_at);
    const createdAtB = new Date(b.created_at);
    return createdAtB - createdAtA; 
  });

  return sortedRecipes;
}

function getRecipesSortByRateAsc(recipes){
  try {
    recipes.sort((a, b) => {
        if (a.averageScore !== undefined && b.averageScore !== undefined && a.averageScore !== b.averageScore) 
            return a.averageScore - b.averageScore;
        return new Date(b.created_at) - new Date(a.created_at);
    });
    return recipes;
  } catch (err) {
    console.error("Failed to sort recipes by rate (asc):", err);
    throw err;
  }
}

function getRecipesSortByRateDesc(recipes) {
  try {
    recipes.sort((a, b) => {
        if (a.averageScore !== undefined && b.averageScore !== undefined && a.averageScore !== b.averageScore) 
            return b.averageScore - a.averageScore;
        return new Date(b.created_at) - new Date(a.created_at);
    });
    return recipes;
  } catch (err) {
    console.error("Failed to sort recipes by rate (desc):", err);
    throw err;
  }
}

function getRecipesSortByPopularityAsc(recipes) {
  recipes.sort((a, b) => {
      if (a.popularity !== undefined && b.popularity !== undefined && a.popularity !== b.popularity) 
          return a.popularity - b.popularity;
      return new Date(b.created_at) - new Date(a.created_at);
  });
  return recipes;
}

function getRecipesSortByPopularityDesc(recipes) {
  recipes.sort((a, b) => {
      if (a.popularity !== undefined && b.popularity !== undefined && a.popularity !== b.popularity) 
          return b.popularity - a.popularity;
      return new Date(b.created_at) - new Date(a.created_at);
  });
  return recipes;
}

function markFavouriteState(recipes, favouriteRecipeIdArray) {
  const favouriteRecipeSet = new Set(favouriteRecipeIdArray);

  recipes.forEach(recipe => {
    recipe.favouriteState = favouriteRecipeSet.has(recipe.id);
  });
  return recipes;
}

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

const express = require("express");
const router = express.Router();
const { getRecentSearchesByUserId } = require("../data/history-ingredient-dao");

router.get("/users/:userId/search-histories", async (req, res) => {
  const userId = req.params.userId;
  let limit = req.query.limit;
  // check limit
  if (!limit) {
    limit = 60;
  }
  const recentSearches = await getRecentSearchesByUserId(userId, limit);
  const uniqueSearchesResult = uniqueSearches(recentSearches, 6);
  res.json(uniqueSearchesResult);
});

function uniqueSearches(searches, limit) {
  const unique = new Map();

  searches.forEach((search) => {
    const ingredientsKey = search.ingredients
      .map((ing) => ing.id)
      .sort((a, b) => a - b) 
      .join("|"); 
    if (!unique.has(ingredientsKey)) {
      unique.set(ingredientsKey, search);
    }
  });

  return Array.from(unique.values()).slice(0, limit);
}

module.exports = router;

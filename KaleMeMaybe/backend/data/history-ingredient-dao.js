const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getRecentSearchesByUserId(userId) {
  const db = await dbPromise;
  try {
    const [recentSearches] = await db.execute(
      SQL`      
    SELECT 
      sh.id AS search_id, 
      sh.created_at, 
      hi.ingredient_id AS ingredient_id, 
      i.name AS ingredient_name
    FROM search_history sh
    JOIN history_ingredient hi ON sh.id = hi.search_history_id
    JOIN ingredient i ON hi.ingredient_id = i.id
    WHERE sh.user_id = ${userId}
    ORDER BY sh.created_at DESC, sh.id, hi.ingredient_id
    LIMIT 60;
  `
    );
    const formattedSearches = formatSearchResults(recentSearches);
    return formattedSearches;
  } catch (err) {
    console.error("Failed to retrieve recent searches from the database:", err);
    throw err;
  }
}

const formatSearchResults = (searchResults) => {
  const searchMap = new Map();

  searchResults.forEach((result) => {
    if (!searchMap.has(result.search_id)) {
      searchMap.set(result.search_id, {
        searchId: result.search_id,
        createdAt: result.created_at,
        ingredients: [],
      });
    }
    searchMap.get(result.search_id).ingredients.push({
      id: result.ingredient_id,
      name: result.ingredient_name,
    });
  });

  return Array.from(searchMap.values());
};

// Export functions.
module.exports = { getRecentSearchesByUserId };

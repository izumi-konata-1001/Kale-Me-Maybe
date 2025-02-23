const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getBrowsingHistory(userId) {
  const db = await dbPromise;
  try {
    const [history] = await db.execute(`
        SELECT DISTINCT b.user_id, b.recipe_id, r.name, r.time_consuming, r.difficulty, r.method, r.image_path, b.created_at,
        CASE WHEN cr.recipe_id IS NULL THEN FALSE ELSE TRUE END AS isCollected
        FROM browsing_history b 
        JOIN recipe r ON b.recipe_id = r.id 
        LEFT JOIN collection_recipe cr ON cr.recipe_id = b.recipe_id AND cr.collection_id IN (
            SELECT c.id FROM collection c WHERE c.user_id = ?
        )
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
        `, [userId, userId]);
    return history;
  } catch (err) {
    console.error(
      "Failed to retrieve browsing histories from the database:",
      err
    );
    throw err;
  }
}

async function updateBrowsingHistory(userId, recipeId) {
  const db = await dbPromise;
  try {
    await db.execute(`
        REPLACE INTO browsing_history (user_id, recipe_id, created_at)
        VALUES (?, ?, CURRENT_TIMESTAMP);`,[userId, recipeId]);
  } catch (err) {
    console.error("Failed to insert browsing histories to the database:", err);
    throw err;
  }
}

async function getRecipesWithIds(recipeIds) {
  const db = await dbPromise;
  try {
    const placeholders = recipeIds.map(() => '?').join(', ');
    const [recipes] = await db.query(`
        SELECT id AS recipe_id, name, time_consuming, difficulty, method, image_path
        FROM recipe WHERE id IN (${placeholders}) 
        ORDER BY created_at DESC`, recipeIds);
    return recipes;
  } catch (err) {
    console.error("Failed to retrieve local browsing recipes:", err);
    throw err;
  }
}

module.exports = {
  getBrowsingHistory,
  updateBrowsingHistory,
  getRecipesWithIds,
};

const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");



async function getBrowsingHistory(userId) {
    const db = await dbPromise;
    const query = `
      SELECT recipe_id
      FROM browsing_history
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
  
    try {
      const [rows] = await db.execute(query, [userId]);
      return rows.map(row => row.recipe_id);
    } catch (error) {
      console.error("Error fetching browsing history:", error);
      throw new Error("Failed to fetch browsing history");
    }
  }

  async function addBrowsingHistory(userId, recipeId, timestamp) {
    const db = await dbPromise;
    await db.query(`
      INSERT INTO browsing_history (user_id, recipe_id, created_at)
      VALUES (?, ?, ?)`, [userId, recipeId, timestamp]
    );
  }
  
  module.exports = {
    getBrowsingHistory,
    addBrowsingHistory,
  };
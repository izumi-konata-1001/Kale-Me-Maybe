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
    await db.query(
      `
      INSERT INTO browsing_history (user_id, recipe_id, created_at)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE created_at = VALUES(created_at)`,
      [userId, recipeId, timestamp]
    );
  }
  
  async function deleteAllBrowsingHistory(userId) {
    const db = await dbPromise;
    const query = `
      DELETE FROM browsing_history
      WHERE user_id = ?
    `;
  
    try {
      await db.execute(query, [userId]);
      console.log(`Browsing history for user ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting browsing history for user ID ${userId}:`, error);
      throw new Error("Failed to delete browsing history");
    }
  }

  module.exports = {
    getBrowsingHistory,
    addBrowsingHistory,
    deleteAllBrowsingHistory,
  };
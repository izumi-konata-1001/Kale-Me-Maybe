const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getBrowsingHistory(userId) {
    const db = await dbPromise;
    try {
        const history = await db.all(SQL`
        SELECT b.user_id, b.recipe_id, b.created_at AS date, r.name, r.time_consuming, r.difficulty, r.method, r.image_path
        FROM browsing_history b JOIN recipe r ON b.recipe_id = r.id 
        WHERE b.user_id = ${userId}`);
        return history;
    } catch (err) {
        console.error('Failed to retrieve browsing histories from the database:', err);
        throw err;
    }
  }


// Export functions.
module.exports = {
    getBrowsingHistory
};

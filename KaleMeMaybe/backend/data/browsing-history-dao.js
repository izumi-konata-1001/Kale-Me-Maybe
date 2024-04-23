const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getBrowsingHistory(userId) {
    const db = await dbPromise;
    try {
        const history = await db.all(SQL`
        SELECT DISTINCT b.user_id, b.recipe_id, r.name, r.time_consuming, r.difficulty, r.method, r.image_path
        FROM browsing_history b JOIN recipe r ON b.recipe_id = r.id 
        WHERE b.user_id = ${userId}
        ORDER BY b.created_at DESC
        `);
        return history;
    } catch (err) {
        console.error('Failed to retrieve browsing histories from the database:', err);
        throw err;
    }
}

async function updateBrowsingHistory(userId, recipeId) {
    const db = await dbPromise;
    try {
        await db.run(SQL`
        INSERT OR REPLACE INTO browsing_history (user_id, recipe_id, created_at)
        VALUES (${userId}, ${recipeId}, CURRENT_TIMESTAMP);`);
    } catch (err) {
        console.error('Failed to insert browsing histories to the database:', err);
        throw err;
    }
}

async function getRecipesWithIds(recipeIds) {
    const db = await dbPromise; 
    try {
        const placeholders = recipeIds.map(() => '?').join(', '); 
        const query = `
        SELECT id AS recipe_id, name, time_consuming, difficulty, method, image_path
        FROM recipe WHERE id IN (${placeholders}) 
        ORDER BY created_at DESC`;
        const recipes = await db.all(query, recipeIds); 
        return recipes;
    } catch (err) {
        console.error('Failed to retrieve local browsing recipes:', err);
        throw err;
    }
}


// Export functions.
module.exports = {
    getBrowsingHistory,
    updateBrowsingHistory,
    getRecipesWithIds
};

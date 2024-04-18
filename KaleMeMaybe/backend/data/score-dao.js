const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


async function updateUserRating(userId, recipeId,score) {
    const db = await dbPromise;
    try {
        await db.run(SQL`
            INSERT INTO score (user_id, recipe_id, score)
        VALUES (${userId}, ${recipeId}, ${score});
        `);
        return { message: "Rating updated successfully" };
    } catch (error) {
        console.error("Error updating rating:", error);
        throw new Error("Failed to update rating.");
    }
}

// Export functions.
module.exports = {
    updateUserRating
};

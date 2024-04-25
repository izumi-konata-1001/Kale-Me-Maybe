const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function updateUserRating(userId, recipeId, score) {
  const db = await dbPromise;
  try {
    await db.run(SQL`
            INSERT INTO score (user_id, recipe_id, score)
        VALUES (${userId}, ${recipeId}, ${score})
        ON CONFLICT(user_id, recipe_id) 
        DO UPDATE SET score = excluded.score, updated_at = CURRENT_TIMESTAMP;
        `);
    return { message: "Rating updated successfully" };
  } catch (error) {
    console.error("Error updating rating:", error);
    throw new Error("Failed to update rating.");
  }
}

async function getAverageScore(recipeId) {
  const db = await dbPromise;
  try {
    const result = await db.get(SQL`
            SELECT AVG(score) AS averageScore FROM score WHERE recipe_id = ${recipeId};
        `);

    if (result && result.averageScore !== null) {
      return { averageScore: parseFloat(result.averageScore.toFixed(1)) }; // Format to one decimal place and return
    } else {
      // Handle the case where no scores are found or calculation is not possible
      return { averageScore: "0" };
    }
  } catch (error) {
    console.error("Error retrieving average score:", error);
    throw new Error(`Failed to retrieve average score: ${error.message}`);
  }
}

// Export functions.
module.exports = {
  updateUserRating,
  getAverageScore,
};

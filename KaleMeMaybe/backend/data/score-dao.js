const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function updateUserRating(userId, recipeId, score) {
  const db = await dbPromise;
  try {
    // Note: Ensure that `user_id` and `recipe_id` together form a unique key or primary key in your table schema.
    await db.execute(SQL`
  INSERT INTO score (user_id, recipe_id, score)
  VALUES (${userId}, ${recipeId}, ${score})
  ON DUPLICATE KEY UPDATE score = VALUES(score);
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
    const [rows] = await db.execute(SQL`
      SELECT AVG(score) AS averageScore FROM score WHERE recipe_id = ${recipeId};
    `);
    const result = rows[0]; // Access the first row of the results

    // Check if the result exists and is not null
    if (result && result.averageScore !== null) {
      const averageScore = parseFloat(result.averageScore);
      // Check if averageScore is a number
      if (!isNaN(averageScore)) {
        return { averageScore: averageScore.toFixed(1) }; // Format to one decimal place and return
      } else {
        throw new Error("Average score is not a number.");
      }
    } else {
      return { averageScore: "0.0" }; // Return "0.0" as a string, similar to your other formatting
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

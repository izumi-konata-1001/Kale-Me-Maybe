const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes(){
    const db = await dbPromise;
    const recipes = await db.all("SELECT * FROM recipe");
    return recipes;
}

async function retrieveRecipeById(id) {
  const db = await dbPromise;

  const recipe = await db.get(`select * from recipe where id=${id}`);

  return recipe;
}

// insert new generated recipe into recipe table and search history table
async function insertRecipeAndSearchHistory(
  recipe,
  image_path,
  user_id,
  ingredients
) {
  let db = await dbPromise;
  try {
    // start transaction
    await db.run("BEGIN");

    // insert recipe data
    const recipeResult = await db.run(
      `
            INSERT INTO recipe (name, time_consuming, difficulty, ingredient_details, method, image_path)
            VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recipe.recipe_name,
        recipe.cooking_time,
        recipe.difficulty,
        recipe.ingredients.join("\n"),
        recipe.steps.join("\n"),
        image_path,
      ]
    );
    const recipeId = recipeResult.lastID;

    // insert recipe_ingredient
    for (let ingredient of ingredients) {
      await db.run(
        `
                INSERT INTO recipe_ingredient (recipe_id, ingredient_id)
                VALUES (?, ?)`,
        [recipeId, ingredient.id]
      );
    }

    // insert search_history
    const searchHistoryResult = await db.run(
      `
            INSERT INTO search_history (user_id)
            VALUES (?)`,
      [user_id]
    );
    const searchHistoryId = searchHistoryResult.lastID;

    // insert history_ingredient table
    for (let ingredient of ingredients) {
      await db.run(
        `
                INSERT INTO history_ingredient (search_history_id, ingredient_id)
                VALUES (?, ?)`,
        [searchHistoryId, ingredient.id]
      );
    }

    // commit transaction
    await db.run("COMMIT");

    return recipeId;
  } catch (err) {
    await db.run("ROLLBACK");
    console.error("Failed to insert recipe and search history:", err);
    throw err;
  }
}

// Export functions.
module.exports = {
    getAllRecipes,
  retrieveRecipeById,
  insertRecipeAndSearchHistory,
};

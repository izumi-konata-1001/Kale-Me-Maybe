const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes(userId) {
  const db = await dbPromise;
  try {
    const query = `
      SELECT r.*, 
             EXISTS(SELECT 1 FROM collection_recipe cr JOIN collection c ON cr.collection_id = c.id WHERE cr.recipe_id = r.id AND c.user_id = ?) as favouriteState
      FROM recipe r
      ORDER BY r.created_at DESC
    `;
    const recipes = await db.all(query, [userId]);
    return recipes;
  } catch (err) {
    console.error("Failed to retrieve recipes from the database:", err);
    throw err;
  }
}

async function retrieveRecipeById(userid, id) {
  const db = await dbPromise;

  const recipe = await db.get(`select * from recipe where id=${id}`);

  const favoriteCheck = await db.get(
    `
      SELECT * FROM collection_recipe 
      WHERE recipe_id = ? AND collection_id IN (
        SELECT id FROM collection WHERE user_id = ?
      )
    `,
    [id, userid]
  );

  return { isFavorited: favoriteCheck ? true : false, recipe: recipe };
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
    await db.beginTransaction();

    // insert recipe data
    const [recipeResult] = await db.execute(
      `
            INSERT INTO recipe (name, time_consuming, difficulty, ingredient_details, method, image_path)
            VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recipe.recipe_name,
        recipe.cooking_time.replace("minutes", "mins"),
        recipe.difficulty,
        recipe.ingredients.join("\n"),
        recipe.steps.join("\n"),
        image_path,
      ]
    );
    const recipeId = recipeResult.insertId;

    // insert recipe_ingredient
    for (let ingredient of ingredients) {
      await db.execute(
        `
                INSERT INTO recipe_ingredient (recipe_id, ingredient_id)
                VALUES (?, ?)`,
        [recipeId, ingredient.id]
      );
    }

    // if user_id is null will not insert search_history and history_ingredient
    if (!user_id) {
      await db.commit();
      return recipeId;
    }

    // insert search_history
    const [searchHistoryResult] = await db.execute(
      `
            INSERT INTO search_history (user_id)
            VALUES (?)`,
      [user_id]
    );
    const searchHistoryId = searchHistoryResult.insertId;


    // insert history_ingredient table
    for (let ingredient of ingredients) {
      await db.execute(
        `
                INSERT INTO history_ingredient (search_history_id, ingredient_id)
                VALUES (?, ?)`,
        [searchHistoryId, ingredient.id]
      );
    }

    // commit transaction
    await db.commit();

    return recipeId;
  } catch (err) {
    await db.rollback();
    console.error("Failed to insert recipe and search history:", err);
    throw err;
  }
}

async function getRecipesSortedByTimeConsuming(direction, userId) {
  const db = await dbPromise;
  try {
    const orderByDirection = direction === "asc" ? "ASC" : "DESC";
    const query = `
        SELECT r.*, 
               EXISTS(SELECT 1 FROM collection_recipe cr JOIN collection c ON cr.collection_id = c.id WHERE cr.recipe_id = r.id AND c.user_id = ?) as favouriteState
        FROM recipe r
        ORDER BY 
          CAST(SUBSTR(r.time_consuming, 1, INSTR(r.time_consuming, ' ') - 1) AS INTEGER) ${orderByDirection},
          r.created_at DESC
      `;
    const recipes = await db.all(query, [userId]);
    return recipes;
  } catch (err) {
    console.error(
      "Failed to retrieve sorted recipes by time consuming from the database:",
      err
    );
    throw err;
  }
}

async function getRecipesSortedByDifficulty(direction, userId) {
  const db = await dbPromise;
  const orderByDirection = direction === "asc" ? "ASC" : "DESC";
  const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  const query = `
    SELECT r.*, 
           EXISTS(SELECT 1 FROM collection_recipe cr JOIN collection c ON cr.collection_id = c.id WHERE cr.recipe_id = r.id AND c.user_id = ?) as favouriteState
    FROM recipe r
    ORDER BY 
      CASE r.difficulty 
        WHEN 'Easy' THEN 1 
        WHEN 'Medium' THEN 2 
        WHEN 'Hard' THEN 3 
      END ${orderByDirection},
      r.created_at DESC
  `;
  const recipes = await db.all(query, [userId]);
  return recipes;
}

async function getRecipesSortedByAverageScore(direction, userId) {
  const db = await dbPromise;
  try {
    const orderByDirection = direction === "asc" ? "ASC" : "DESC";
    const query = `
      SELECT r.*, 
             IFNULL(AVG(s.score), 0) as avg_score,
             EXISTS(SELECT 1 FROM collection_recipe cr JOIN collection c ON cr.collection_id = c.id WHERE cr.recipe_id = r.id AND c.user_id = ?) as favouriteState
      FROM recipe r
      LEFT JOIN score s ON r.id = s.recipe_id
      GROUP BY r.id
      ORDER BY avg_score ${orderByDirection}, r.created_at DESC
    `;
    const recipesWithScores = await db.all(query, [userId]);
    return recipesWithScores;
  } catch (err) {
    console.error(
      "Failed to retrieve recipes sorted by average score from the database:",
      err
    );
    throw err;
  }
}

async function getRecipesSortedByPopularity(direction, userId) {
  const db = await dbPromise;
  try {
    const orderByDirection = direction === "asc" ? "ASC" : "DESC";
    const query = `
      SELECT r.*, 
             COUNT(cr.collection_id) AS popularity,
             EXISTS(SELECT 1 FROM collection_recipe cr JOIN collection c ON cr.collection_id = c.id WHERE cr.recipe_id = r.id AND c.user_id = ?) as favouriteState
      FROM recipe r
      LEFT JOIN collection_recipe cr ON r.id = cr.recipe_id
      GROUP BY r.id
      ORDER BY popularity ${orderByDirection}, r.created_at DESC
    `;
    const recipesWithPopularity = await db.all(query, [userId]);
    return recipesWithPopularity;
  } catch (err) {
    console.error(
      "Failed to retrieve recipes sorted by collection count from the database:",
      err
    );
    throw err;
  }
}

async function removeRecipeFromFavourites(userId, recipeId) {
  const db = await dbPromise;
  try {
    await db.run(
      `
      DELETE FROM collection_recipe
      WHERE recipe_id = ? AND collection_id IN (
        SELECT id FROM collection WHERE user_id = ?
      )
    `,
      [recipeId, userId]
    );
  } catch (err) {
    console.error("Failed to remove recipe from favourites:", err);
    throw err;
  }
}

// Export functions.
module.exports = {
  getAllRecipes,
  retrieveRecipeById,
  insertRecipeAndSearchHistory,
  getRecipesSortedByTimeConsuming,
  getRecipesSortedByDifficulty,
  getRecipesSortedByAverageScore,
  getRecipesSortedByPopularity,
  removeRecipeFromFavourites,
};

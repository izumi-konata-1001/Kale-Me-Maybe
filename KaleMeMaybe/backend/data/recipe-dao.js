const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes() {
  const db = await dbPromise;
  try {
      const query = `
          SELECT *
          FROM recipe
          ORDER BY id DESC;
      `;
      const [recipes] = await db.query(query);
      return recipes;
  } catch (err) {
      console.error("Failed to retrieve all recipes from the database:", err);
      throw err;
  }
}

async function retrieveRecipeById(userid, id) {
  const db = await dbPromise;

  const recipe = await db.query(SQL`SELECT * FROM recipe WHERE id = ${id}`);
  
  const favoriteCheck = await db.query(SQL`
    SELECT * FROM collection_recipe 
    WHERE recipe_id = ${id} AND collection_id IN (
      SELECT id FROM collection WHERE user_id = ${userid}
    )
  `);

  return { isFavorited: favoriteCheck[0].length > 0, recipe: recipe[0][0] };
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
async function removeRecipeFromFavourites(userId, recipeId) {
  const db = await dbPromise;
  try {
    const query = SQL`
      DELETE FROM collection_recipe
      WHERE recipe_id = ${recipeId} AND collection_id IN (
        SELECT id FROM collection WHERE user_id = ${userId}
      )
    `;
    await db.query(query);
  } catch (err) {
    console.error("Failed to remove recipe from favourites:", err);
    throw err;
  }
}

async function getRecipesSortByDifficultyAsc() {
  const db = await dbPromise;
  try {
      const query = `
          SELECT *
          FROM recipe
          ORDER BY 
              CASE difficulty
                  WHEN 'easy' THEN 1
                  WHEN 'medium' THEN 2
                  WHEN 'hard' THEN 3
                  ELSE 4
              END,
              created_at DESC;
      `;
      const [recipes] = await db.query(query);
      return recipes;
  } catch (err) {
      console.error("Failed to retrieve sorted recipes by difficulty (asc) from the database:", err);
      throw err;
  }
}

async function getRecipesSortByDifficultyDesc() {
  const db = await dbPromise;
  try {
      const query = `
          SELECT *
          FROM recipe
          ORDER BY 
              CASE difficulty
                  WHEN 'easy' THEN 3
                  WHEN 'medium' THEN 2
                  WHEN 'hard' THEN 1
                  ELSE 4
              END,
              created_at DESC;
      `;
      const [recipes] = await db.query(query);
      return recipes;
  } catch (err) {
      console.error("Failed to retrieve sorted recipes by difficulty (desc) from the database:", err);
      throw err;
  }
}

async function addAverageScore() {
  const db = await dbPromise;
  try {
    const query = `
      SELECT r.*, AVG(IFNULL(s.score, NULL)) AS averageScore
      FROM recipe r
      LEFT JOIN score s ON r.id = s.recipe_id
      GROUP BY r.id;
    `;
    const [recipesWithAverageScore] = await db.query(query);
    return recipesWithAverageScore;
  } catch (err) {
    console.error("Failed to add average score to recipes:", err);
    throw err;
  }
}

async function addPopularity() {
  const db = await dbPromise;
  try {
      const query = `
          SELECT r.*, COALESCE(c.popularity, 0) AS popularity
          FROM recipe r
          LEFT JOIN (
              SELECT recipe_id, COUNT(*) AS popularity
              FROM collection_recipe
              GROUP BY recipe_id
          ) c ON r.id = c.recipe_id;
      `;
      const [recipes] = await db.query(query);
      return recipes;
  } catch (err) {
      console.error("Failed to retrieve and augment recipes with popularity:", err);
      throw err;
  }
}

async function getAllCollections(userId) {
  const db = await dbPromise;
  try {
    const query = `
      SELECT *
      FROM collection
      WHERE user_id = ${userId};
    `;
    const [collections] = await db.query(query);
    return collections;
  } catch (error) {
    console.error("Failed to get all collections:", error);
    throw error;
  }
}

async function getFavouriteRecipe(collections) {
  const db = await dbPromise;
  try {
    if (!Array.isArray(collections)) {
      return [];
    }

    if (collections.length === 0)
      return [];

    const collectionIds = collections.map(collection => collection.id);

    const query = `
      SELECT cr.recipe_id
      FROM collection_recipe cr
      WHERE cr.collection_id IN (${collectionIds.join(',')});
    `;
    const [recipeIds] = await db.query(query);

    if (recipeIds.length === 0) 
      return [];

    const recipeIdArray = recipeIds.map(recipe => recipe.recipe_id);

    return recipeIdArray;
  } catch (error) {
    console.error("Failed to get favourite recipes:", error);
    throw error;
  }
}

async function getRecipesByIds(recipeIds) {
  const db = await dbPromise;
  if (recipeIds.length === 0) return [];

  const query = `
    SELECT *
    FROM recipe
    WHERE id IN (?)
  `;

  try {
    const [rows] = await db.execute(query, [recipeIds]);
    return rows;
  } catch (error) {
    console.error("Error fetching recipes by IDs:", error);
    throw new Error("Failed to fetch recipes");
  }
}

// Export functions.
module.exports = {
  getAllRecipes,
  retrieveRecipeById,
  insertRecipeAndSearchHistory,
  removeRecipeFromFavourites,
  getRecipesSortByDifficultyAsc,
  getRecipesSortByDifficultyDesc,
  addAverageScore,
  addPopularity,
  getAllCollections,
  getFavouriteRecipe,
  getRecipesByIds,
};

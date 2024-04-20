const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes() {
  const db = await dbPromise;
  try {
      const recipes = await db.all(SQL`SELECT * FROM recipe`);
      return recipes;
  } catch (err) {
      console.error('Failed to retrieve recipes from the database:', err);
      throw err;
  }
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
        recipe.ingredients.join(", "),
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

async function getRecipesSortedByTimeConsuming(direction) {
  const recipes = await getAllRecipes();
  return recipes.sort((a, b) => {
      // 从 'time_consuming' 中提取数值部分（例如，"30 mins" -> 30）
      let timeA = parseInt(a.time_consuming.split(' ')[0]);  // 仅取数字部分
      let timeB = parseInt(b.time_consuming.split(' ')[0]);  // 仅取数字部分

      // 检查主排序条件 'time_consuming' 是否相同
      if (timeA === timeB) {
          // 主排序条件相同，按 'created_at' 降序排序
          return new Date(b.created_at) - new Date(a.created_at);
      }

      // 根据提供的方向进行排序
      if (direction === 'asc') {
          return timeA - timeB;  // 升序排序
      } else {
          return timeB - timeA;  // 降序排序
      }
  });
}

async function getRecipesSortedByDifficulty(direction) {
  const recipes = await getAllRecipes();
  return recipes.sort((a, b) => {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      
      let diffOrderA = difficultyOrder[a.difficulty];
      let diffOrderB = difficultyOrder[b.difficulty];

      if (diffOrderA === diffOrderB) {
          return new Date(b.created_at) - new Date(a.created_at);
      }

      if (direction === 'asc') {
          return diffOrderA - diffOrderB;
      } else {
          return diffOrderB - diffOrderA;
      }
  });
}

async function getRecipesSortedByAverageScore(direction) {
  const db = await dbPromise;
  try {
    // 校验并设置排序方向
    const orderByDirection = direction === 'asc' ? 'ASC' : 'DESC';

    // 构建 SQL 查询字符串
    const query = `
      SELECT r.id, r.name, r.time_consuming, r.difficulty, r.ingredient_details, r.method, r.image_path, r.created_at, r.updated_at, 
             IFNULL(AVG(s.score), 0) as avg_score
      FROM recipe r
      LEFT JOIN score s ON r.id = s.recipe_id
      GROUP BY r.id
      ORDER BY avg_score ${orderByDirection}, r.created_at DESC
    `;

    const recipesWithScores = await db.all(query);

    return recipesWithScores;
  } catch (err) {
    console.error('Failed to retrieve recipes sorted by average score from the database:', err);
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
  getRecipesSortedByAverageScore
};

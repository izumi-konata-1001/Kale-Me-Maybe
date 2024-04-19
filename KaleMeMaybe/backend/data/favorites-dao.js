const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//retrive data of user's favorites
//change userID into tokens later
async function getFavorites(user) {
  try {
    const db = await dbPromise;

    const collections = await db.all(SQL`
        SELECT 
        c.id,
        c.name AS CollectionName,
        COUNT(cr.recipe_id) AS RecipeCount,
        COALESCE((
            SELECT r.image_path
            FROM recipe r
            JOIN collection_recipe cr ON cr.recipe_id = r.id
            WHERE cr.collection_id = c.id
            ORDER BY r.created_at DESC
            LIMIT 1
        ), '/nothingHere.jpg') AS LatestRecipeImagePath,
        c.updated_at AS CollectionUpdatedAt
      FROM 
        collection c
      LEFT JOIN 
        collection_recipe cr ON c.id = cr.collection_id
      WHERE 
        c.user_id = ${user}
      GROUP BY 
        c.id
      ORDER BY 
        c.updated_at DESC
  
    `);

    return collections;
  } catch (error) {
    console.error("Database error: ", error);
  }
}

async function createCollection(user, collectionName) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT id FROM user WHERE id = ${user}`);
    if (!userCheck) {
      throw new Error('User does not exist');
    }

    await db.run(SQL`
      INSERT INTO collection (name, user_id, created_at, updated_at)
      VALUES (${collectionName}, ${user}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `);

    const collections = await getFavorites(user);
    return collections;
    
  } catch (error) {
    console.error("Database error: ", error);
    throw error;
  }
}

async function searchFavorites(user, searchTerm) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT id FROM user WHERE id = ${user}`);
    if (!userCheck) {
      throw new Error('User does not exist');
    }

    const rows = await db.all(`
      SELECT DISTINCT r.*
      FROM collection c
      JOIN collection_recipe cr ON c.id = cr.collection_id
      JOIN recipe r ON cr.recipe_id = r.id
      WHERE c.user_id = ? 
      AND (
          r.name LIKE '%' || ? || '%' OR 
          r.ingredient_details LIKE '%' || ? || '%' OR 
          r.method LIKE '%' || ? || '%'
      )
    `, [user, searchTerm, searchTerm, searchTerm]);

      return rows;
    
  } catch (error) {
    console.error("Database error: ", error);
    throw error;
  }
}

// Export functions.
module.exports = {
  getFavorites,
  createCollection,
  searchFavorites,
};

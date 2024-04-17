const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//retrive data of user's favorites
async function getFavorites(user) {
  try {
    const db = await dbPromise;
    console.log("after connected")

    const collections = await db.all(SQL`
    SELECT 
    c.id,
    c.name AS CollectionName,
    COUNT(cr.recipe_id) AS RecipeCount,
    (
        SELECT r.image_path
        FROM recipe r
        JOIN collection_recipe cr ON cr.recipe_id = r.id
        WHERE cr.collection_id = c.id
        ORDER BY r.created_at DESC
        LIMIT 1
    ) AS LatestRecipeImagePath,
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
    console.log(collections)

    return collections;
  } catch (error){
    console.error("Database error: ", error);
  }
}


// Export functions.
module.exports = {
  getFavorites,
};

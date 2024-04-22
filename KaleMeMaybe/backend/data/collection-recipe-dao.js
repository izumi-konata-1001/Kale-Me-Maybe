const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retriveCollection(userId, collectionId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT * FROM user WHERE id = ${userId}`);
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    const collectionCheck = await db.get(SQL`
            SELECT id FROM collection 
            WHERE id = ${collectionId} AND user_id = ${userId}
        `);
    if (!collectionCheck) {
      throw new Error("Collection does not belong to user");
    }

    const recipes = await db.all(SQL`
            SELECT r.id, r.name, r.time_consuming, r.difficulty, r.ingredient_details, r.method, r.image_path
            FROM recipe r
            JOIN collection_recipe cr ON cr.recipe_id = r.id
            WHERE cr.collection_id = ${collectionId}
        `);

    return recipes;
  } catch (error) {
    console.error("Error retrieving collection: ", error);
    throw error;
  }
}

// Export functions.
module.exports = {
  retriveCollection,
};

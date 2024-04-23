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
            SELECT name FROM collection 
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

    return {name: collectionCheck.name, recipes: recipes};
  } catch (error) {
    console.error("Error retrieving collection: ", error);
    throw error;
  }
}

async function deleteCollection (userId, collectionId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT * FROM user WHERE id = ${userId}`);
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    const collectionCheck = await db.get(SQL`
            SELECT name FROM collection 
            WHERE id = ${collectionId} AND user_id = ${userId}
        `);
    if (!collectionCheck) {
      throw new Error("Collection does not belong to user");
    }

    const deleteStatement = SQL`
      DELETE FROM collection 
      WHERE id = ${collectionId} AND user_id = ${userId}
    `;
    const result = await db.run(deleteStatement);

    if (result.changes > 0) {
      console.log("Collection deleted successfully.");
      return result.changes;
    } else {
      console.log("No collection was deleted.");
    }
    

  } catch (error) {
    console.error("Error retrieving collection: ", error);
    throw error;
  }
}

async function addRecipeToCollection (userId, collectionId, recipeId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT * FROM user WHERE id = ${userId}`);
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    // Check if the collection exists and belongs to the user
    const collectionCheck = await db.get(SQL`
      SELECT * FROM collection 
      WHERE id = ${collectionId} AND user_id = ${userId}
    `);
    if (!collectionCheck) {
      throw new Error("Collection does not exist or does not belong to the user");
    }

    // Check if the recipe exists
    const recipeCheck = await db.get(SQL`
      SELECT * FROM recipe 
      WHERE id = ${recipeId}
    `);
    if (!recipeCheck) {
      throw new Error("Recipe does not exist");
    }

    // Insert the recipe into the collection
    const insertResult = await db.run(SQL`
      INSERT INTO collection_recipe (collection_id, recipe_id)
      VALUES (${collectionId}, ${recipeId})
    `);

    if (insertResult.lastID) {
      console.log("Recipe added to collection successfully");
      return { success: true, message: "Recipe added to collection successfully" };
    } else {
      throw new Error("Failed to add the recipe to the collection");
    }

  } catch (error) {
    console.error("Error adding to collection: ", error);
    throw error;
  }
}

async function renameCollection (userId, collectionId, newName) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(SQL`SELECT * FROM user WHERE id = ${userId}`);
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    // Check if the collection exists and belongs to the user
    const collectionCheck = await db.get(SQL`
      SELECT * FROM collection 
      WHERE id = ${collectionId} AND user_id = ${userId}
    `);
    if (!collectionCheck) {
      throw new Error("Collection does not exist or does not belong to the user");
    }

    // Update the collection name
    const updateResult = await db.run(SQL`
      UPDATE collection
      SET name = ${newName}
      WHERE id = ${collectionId} AND user_id = ${userId}
    `);

    if (updateResult.changes === 0) {
      throw new Error("No changes made to the collection");
    }

    return { success: true, message: "Collection renamed successfully." };


  } catch (error) {
    console.error("Error renaming collection in database: ", error);
    throw error;
  }
}

// Export functions.
module.exports = {
  retriveCollection,
  deleteCollection,
  addRecipeToCollection,
  renameCollection,
};

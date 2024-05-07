const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Retrieve data of user's favorites
async function retrieveCollection(userId, collectionId) {
  try {
    const db = await dbPromise;

    // Check user existence
    const [userCheck] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId]);
    if (userCheck.length === 0) {
      throw new Error("User does not exist");
    }

    // Check collection existence
    const [collectionCheck] = await db.query(`
      SELECT name FROM collection 
      WHERE id = ? AND user_id = ?`, [collectionId, userId]
    );
    if (collectionCheck.length === 0) {
      throw new Error("Collection does not belong to user");
    }

    // Retrieve recipes
    const [recipes] = await db.query(`
      SELECT r.id, r.name, r.time_consuming, r.difficulty, r.ingredient_details, r.method, r.image_path, TRUE as favouriteState
      FROM recipe r
      JOIN collection_recipe cr ON cr.recipe_id = r.id
      WHERE cr.collection_id = ?`, [collectionId]
    );

    return { name: collectionCheck[0].name, recipes: recipes };
  } catch (error) {
    console.error("Error retrieving collection: ", error);
    throw error;
  }
}

async function deleteCollection(userId, collectionId) {
  try {
    const db = await dbPromise;

    // Check user existence
    const [userCheck] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId]);
    if (userCheck.length === 0) {
      throw new Error("User does not exist");
    }

    // Delete collection
    const [result] = await db.query(`
      DELETE FROM collection 
      WHERE id = ? AND user_id = ?`, [collectionId, userId]
    );

    if (result.affectedRows > 0) {
      return result.affectedRows;
    } else {
      return 0;
    }
  } catch (error) {
    throw error;
  }
}

async function addRecipeToCollection(userId, collectionId, recipeId) {
  try {
    const db = await dbPromise;

    // Check user existence
    const [userCheck] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId]);
    if (userCheck.length === 0) {
      throw new Error("User does not exist");
    }

    // Insert recipe into collection
    const [insertResult] = await db.query(`
      INSERT INTO collection_recipe (collection_id, recipe_id)
      VALUES (?, ?)`, [collectionId, recipeId]
    );

    if (insertResult.affectedRows) {
      return {
        success: true,
        message: "Recipe added to collection successfully",
      };
    } else {
      throw new Error("Failed to add the recipe to the collection");
    }
  } catch (error) {
    throw error;
  }
}

async function renameCollection(userId, collectionId, newName) {
  try {
    const db = await dbPromise;

    // Check user existence
    const [userCheck] = await db.query(`SELECT * FROM user WHERE id = ?`, [userId]);
    if (userCheck.length === 0) {
      throw new Error("User does not exist");
    }

    // Update collection name
    const [updateResult] = await db.query(`
      UPDATE collection
      SET name = ?
      WHERE id = ? AND user_id = ?`, [newName, collectionId, userId]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("No changes made to the collection");
    }

    return { success: true, message: "Collection renamed successfully." };
  } catch (error) {
    console.error("Error renaming collection in database: ", error);
    throw error;
  }
}

async function batchDeletion(userId, collectionId, recipeIds) {
  const db = await dbPromise;
  try {
    await db.beginTransaction();

    for (const recipeId of recipeIds) {
      await db.query(`
        DELETE FROM collection_recipe 
        WHERE collection_id = ? AND recipe_id = ? AND EXISTS (
          SELECT 1 FROM collection WHERE id = ? AND user_id = ?)
      `, [collectionId, recipeId, collectionId, userId]);
    }

    await db.commit();
  } catch (error) {
    console.error("Failed to delete recipes from collection:", error);
    await db.rollback();
    throw error;
  }
}

// Export functions.
module.exports = {
  retrieveCollection,
  deleteCollection,
  addRecipeToCollection,
  renameCollection,
  batchDeletion,
};

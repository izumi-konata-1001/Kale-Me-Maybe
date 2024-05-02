const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retriveCollection(userId, collectionId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(
      `SELECT * FROM user WHERE id = ?`, [userId]
    );
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    const collectionCheck = await db.get(`
            SELECT name FROM collection 
            WHERE id = ? AND user_id = ?`, [collectionId, userId]
        );
    if (!collectionCheck) {
      throw new Error("Collection does not belong to user");
    }

    const recipes = await db.all(`
            SELECT r.id, r.name, r.time_consuming, r.difficulty, r.ingredient_details, r.method, r.image_path, TRUE as favouriteState
            FROM recipe r
            JOIN collection_recipe cr ON cr.recipe_id = r.id
            WHERE cr.collection_id = ?`, [collectionId]
        );

    return { name: collectionCheck.name, recipes: recipes };
  } catch (error) {
    console.error("Error retrieving collection: ", error);
    throw error;
  }
}

async function deleteCollection(userId, collectionId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(
      `SELECT * FROM user WHERE id = ?`, [userId]
    );
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    const collectionCheck = await db.get(`
            SELECT name FROM collection 
            WHERE id = ? AND user_id = ?`, [collectionId, userId]
        );
    if (!collectionCheck) {
      throw new Error("Collection does not belong to user");
    }

    const result = await db.run(`
      DELETE FROM collection 
      WHERE id = ? AND user_id = ?`, [collectionId, userId]
    );

    if (result.affectedRows > 0) {
      console.log("Collection deleted successfully.");
      return result.affectedRows;
    } else {
      console.log("No collection was deleted.");
    }
  } catch (error) {
    console.error("Error deleting collection: ", error);
    throw error;
  }
}

async function addRecipeToCollection(userId, collectionId, recipeId) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(
      `SELECT * FROM user WHERE id = ?`, [userId]
    );
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    // Check if the collection exists and belongs to the user
    const collectionCheck = await db.get(`
      SELECT * FROM collection 
      WHERE id = ? AND user_id = ?`, [collectionId, userId]
    );
    if (!collectionCheck) {
      throw new Error(
        "Collection does not exist or does not belong to the user"
      );
    }

    // Check if the recipe exists
    const recipeCheck = await db.get(`
      SELECT * FROM recipe 
      WHERE id = ?`, [recipeId]
    );
    if (!recipeCheck) {
      throw new Error("Recipe does not exist");
    }

    // Insert the recipe into the collection
    const insertResult = await db.run(`
      INSERT INTO collection_recipe (collection_id, recipe_id)
      VALUES (?, ?)`, [collectionId, recipeId]
    );

    if (insertResult.insertId) {
      console.log("Recipe added to collection successfully");
      return {
        success: true,
        message: "Recipe added to collection successfully",
      };
    } else {
      throw new Error("Failed to add the recipe to the collection");
    }
  } catch (error) {
    console.error("Error adding to collection: ", error);
    throw error;
  }
}

async function renameCollection(userId, collectionId, newName) {
  try {
    const db = await dbPromise;

    const userCheck = await db.get(
      `SELECT * FROM user WHERE id = ?`, [userId]
    );
    if (!userCheck) {
      throw new Error("User does not exist");
    }

    // Check if the collection exists and belongs to the user
    const collectionCheck = await db.get(`
      SELECT * FROM collection 
      WHERE id = ? AND user_id = ?`, [collectionId, userId]
    );
    if (!collectionCheck) {
      throw new Error(
        "Collection does not exist or does not belong to the user"
      );
    }

    // Update the collection name
    const updateResult = await db.run(`
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
  try {
    const db = await dbPromise;
    await db.beginTransaction();

    const stmt = await db.prepare(`
      DELETE FROM collection_recipe WHERE collection_id = ? AND recipe_id = ? AND EXISTS (
          SELECT 1 FROM collection WHERE id = ? AND user_id = ?)
    `);

    for (const recipeId of recipeIds) {
      await stmt.execute([collectionId, recipeId, collectionId, userId]);
    }

    await db.commit();

    console.log("Batch deletion successful.");
  } catch (error) {
    console.error("Failed to delete recipes from collection:", error);
    await db.rollback();
    throw error;
  }
}

// Export functions.
module.exports = {
  retriveCollection,
  deleteCollection,
  addRecipeToCollection,
  renameCollection,
  batchDeletion,
};

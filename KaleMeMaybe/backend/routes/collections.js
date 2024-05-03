const express = require("express");
const router = express.Router();
const collectionDao = require("../data/collection-recipe-dao.js");

router.use(express.json());

router.get("/:userid/:id", async function (req, res) {
  const userId = req.params.userid;
  const collectionId = req.params.id;

  try {
    const result = await collectionDao.retrieveCollection(userId, collectionId);

    if (result.recipes.length === 0) {
      res.json({ message: "There is nothing here yet.", name: result.name });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrive collection details. " });
  }
});

router.delete("/:userid/:id", async function (req, res) {
  const userId = req.params.userid;
  const collectionId = req.params.id;

  try {
    const result = await collectionDao.deleteCollection(userId, collectionId);

    if (result > 0) {
      res.json({ success: "Collection deleted successfully." });
    } else {
      res.status(404).json({
        fail: "No collection found to delete or collection does not belong to the user.",
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete the collection. " });
  }
});

router.post("/:userid/:id", async function (req, res) {
  const userId = req.params.userid;
  const collectionId = req.params.id;
  const recipeId = req.body.recipeId;

  if (!recipeId) {
    return res.status(400).json({ error: "Missing recipeId in request body." });
  }

  try {
    const result = await collectionDao.addRecipeToCollection(
      userId,
      collectionId,
      recipeId
    );

    if (result.success) {
      res
        .status(200)
        .json({ message: "Recipe successfully added to collection." });
    } else {
      res.status(400).json({ error: "Failed to add recipe to collection." });
    }
  } catch (error) {
    console.error("Error adding recipe to collection: ", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:userid/:id", async function (req, res) {
  const userId = req.params.userid;
  const collectionId = req.params.id;
  const newName = req.body.name;

  try {
    const result = await collectionDao.renameCollection(
      userId,
      collectionId,
      newName
    );

    if (result.success) {
      res.status(200).json({ message: "Renamed collection." });
    } else {
      res.status(400).json({ error: "Failed to rename collection." });
    }
  } catch (error) {
    console.error("Error renaming collection: ", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:userid/:id/batch", async function (req, res) {
  const userId = req.params.userid;
  const collectionId = req.params.id;
  const recipeIds = req.body.recipeIds;

  try {
    await collectionDao.batchDeletion(userId, collectionId, recipeIds);

    res.status(200).json({ message: "Batch deletion completed." });
  } catch (error) {
    console.error("Error ocurred while batch deletion: ", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

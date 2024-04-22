const express = require("express");
const router = express.Router();
const collectionDao = require("../data/collection-recipe-dao.js");

router.use(express.json());

router.get("/:userid/:id", async function (req, res) {
    const userId = req.params.userid;
    const collectionId = req.params.id;

    try {
        const result = await collectionDao.retriveCollection(userId, collectionId);

        if (result.recipes.length === 0) {
            res.json({ message: "There is nothing here yet." , name: result.name});
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500).send({ error: "Failed to retrive collection details. " });
    }
})

module.exports = router;

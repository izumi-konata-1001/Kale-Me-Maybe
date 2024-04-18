const express = require('express');
const router = express.Router();
const { updateUserRating } = require('../data/score-dao');

router.post('/score', async (req, res) => {
    const { userId, recipeId, score } = req.body;
    try {
        const result = await updateUserRating(userId, recipeId, score);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to update the score due to internal error." });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { updateUserRating,getAverageScore } = require('../data/score-dao');

router.post('/score', async (req, res) => {
    const { userId, recipeId, score } = req.body;
    try {
        const result = await updateUserRating(userId, recipeId, score);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to update the score due to internal error." });
    }
});

router.get('/score/average/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    try {
        const average = await getAverageScore(recipeId);
        res.json(average);
    } catch (error) {
        res.status(500).json({ message: `Failed to retrieve the average score.` });
    }
});


module.exports = router;
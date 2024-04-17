const express = require('express');
const router = express.Router();
const recipeDao = require('../data/recipe-dao.js');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeDao.getAllRecipes();
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
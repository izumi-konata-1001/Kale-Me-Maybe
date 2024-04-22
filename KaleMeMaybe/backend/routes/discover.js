const express = require('express');
const router = express.Router();
const recipeDao = require('../data/recipe-dao.js');

router.get('/', async (req, res) => {
    try {
        const { sort, direction } = req.query;
        let recipes = [];
        console.log(`Sorted by ${sort} in ${direction} direction`);
        if (sort == "time")
        {
            if (direction != "")
                recipes = await recipeDao.getRecipesSortedByTimeConsuming(direction);
            else
                recipes = await recipeDao.getAllRecipes();
        }
        else if (sort == "difficulty")
        {
            if (direction !="")
                recipes = await recipeDao.getRecipesSortedByDifficulty(direction);
            else
                recipes = await recipeDao.getAllRecipes();
        }
        else if(sort == "rate")
        {
            if (direction !="")
                recipes = await recipeDao.getRecipesSortedByAverageScore(direction);
            else
                recipes = await recipeDao.getAllRecipes();
        }
        else if(sort == "popularity")
        {
            if (direction !="")
                recipes = await recipeDao.getRecipesSortedByPopularity(direction);
            else
                recipes = await recipeDao.getAllRecipes();
        }
        else
            recipes = await recipeDao.getAllRecipes();
        res.json({ recipes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
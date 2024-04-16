const express = require('express');
const router = express.Router();
const recipeDao = require('../data/recipe-dao.js');
const ingredientDao = require('../data/ingredient-dao.js');

router.get('/', async (req, res) => {
    try {
        const [recipes, ingredients] = await Promise.all([
        recipeDao.getAllRecipes(),
        ingredientDao.getAllIngredient()])
    res.json({ recipes, ingredients });
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;

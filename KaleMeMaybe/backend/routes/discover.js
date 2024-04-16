const express = require('express');
const router = express.Router();
const recipeDao = require('../data/recipe-dao.js');

router.get('/', async (req, res) => {
  const recipes = await recipeDao.getAllRecipes();
  res.json(recipes);
});

module.exports = router;

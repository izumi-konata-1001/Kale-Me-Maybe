const express = require("express");
const router = express.Router();
const {
  generateRecipeWithIngredients,
} = require("../data/ai-recipe-generator");

const { retrieveRecipeById } = require('../data/recipe-dao');

// test api health
router.get("/health", async (req, res) => {
  res.status(200).send("API is healthy!");
});

// recipe generator
router.post("/recipe/generate", async (req, res) => {
  console.log("Generating recipe with ingredients:", req.body);
  const { ingredients } = req.body;
  // check if ingredients list is empty
  if (!ingredients || ingredients.length === 0) {
    return res
      .status(400)
      .json({ error: "Ingredients list is required and cannot be empty." });
  }

  try {
    const recipe = await generateRecipeWithIngredients(ingredients);
    res.status(200).json({ recipe: recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate." });
  }
});

router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await retrieveRecipeById(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

module.exports = router;

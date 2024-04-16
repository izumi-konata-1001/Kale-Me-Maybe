const express = require("express");
const router = express.Router();
const {
  generateRecipeWithIngredients,
} = require("../data/ai-recipe-generator");

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

module.exports = router;

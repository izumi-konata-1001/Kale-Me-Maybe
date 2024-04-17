const express = require("express");
const router = express.Router();
const {
  generateRecipeWithIngredients,
  generateRecipeImage,
} = require("../data/ai-recipe-generator");


// test api health
router.get("/health", async (req, res) => {
  res.status(200).send("API is healthy!");
});

// recipe generator
router.post("/recipes", async (req, res) => {
  console.log("Generating recipe with ingredients:", req.body);
  const { ingredients } = req.body;
  // check if ingredients list is empty
  if (!ingredients || ingredients.length === 0) {
    return res
      .status(400)
      .json({ error: "Ingredients list is required and cannot be empty." });
  }

  try {
    // generate recipe with ingredients
    // const recipe = await generateRecipeWithIngredients(ingredients);
    // const recipeName = recipe.name;

    const recipeName = "Coconut Curry Potato Stew";
    // generate image using the recipe name
    // const image_path = await generateRecipeImage(recipeName);
    const image_path = "test path"
    console.log("Image path:", image_path);

    // store recipe data in database
    console.log(recipeName);
    console.log("=====================================");
    console.log(image_path);

    res.status(200).json({ recipe: recipeName });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate." });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { queryIngredients } = require("../data/ingredient-dao");

// get ingredients by prefix
router.get("/ingredients", async (req, res) => {
  try {
    const prefix = req.query.prefix;
    if (prefix) {
      const ingredients = await queryIngredients(prefix);

      // check if ingredients list is empty
      if (!ingredients || ingredients.length === 0) {
        return res.status(404).json({ error: "No ingredients found." });
      }

      res.json(ingredients);
    } else {
      res.status(400).send("Prefix query parameter is required");
    }
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    res.status(500).send("Error fetching ingredients");
  }
});

module.exports = router;

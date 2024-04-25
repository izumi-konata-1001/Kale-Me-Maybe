const fs = require("fs").promises;
const path = require("path");
const dbPromise = require("../data/database.js");

async function insertIngredients() {
  try {
    const db = await dbPromise;
    const filePath = path.join(__dirname, "./vegan_ingredients_data.json");
    const data = await fs.readFile(filePath, "utf8");
    const ingredients = JSON.parse(data);

    console.log("Inserting ingredients into the database...");
    const insertPromises = ingredients.map((ingredient) => {
      const imagePath = `images/${ingredient.name
        .toLowerCase()
        .replace(/ /g, "_")}.png`;
      return db.run(
        `INSERT INTO ingredient (id, name, image_path) VALUES (?, ?, ?)`,
        [ingredient.id, ingredient.name, imagePath]
      );
    });

    console.log("Waiting for all ingredients to be added...");
    await Promise.all(insertPromises);
    console.log("All ingredients have been successfully added.");
  } catch (err) {
    console.error("Failed to read file or insert data", err);
  }
}

insertIngredients();

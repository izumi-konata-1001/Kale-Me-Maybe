const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Query ingredients by prefix.
async function queryIngredients(prefix) {
  const db = await dbPromise;
  const query = SQL`SELECT id, name FROM ingredient WHERE LOWER(name) LIKE ${
    "%" + prefix.toLowerCase() + "%"
  } ORDER BY name`;
  const ingredients = await db.execute(query);
  return ingredients;
}

// Export functions.
module.exports = {
  queryIngredients,
};

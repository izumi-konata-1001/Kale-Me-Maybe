const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function queryIngredients(prefix) {
  const db = await dbPromise;
  const query = SQL`SELECT id, name FROM ingredient WHERE name LIKE ${
    prefix + "%"
  } ORDER BY name`;
  const ingredients = await db.all(query);
  return ingredients;
}


// Export functions.
module.exports = {
  queryIngredients,
};

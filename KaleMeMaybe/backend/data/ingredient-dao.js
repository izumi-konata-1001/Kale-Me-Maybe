const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllIngredient(){
    const db = await dbPromise;
    const recipes = await db.all("SELECT * FROM ingredient");
    return recipes;
}

// Export functions.
module.exports = {
    getAllIngredient
};

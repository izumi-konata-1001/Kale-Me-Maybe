const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes(){
    const db = await dbPromise;
    const recipes = await db.all("SELECT * FROM recipe");
    return recipes;
}

module.exports = {
    getAllRecipes
};

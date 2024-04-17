const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getAllRecipes(){
    const db = await dbPromise;
    const recipes = await db.all("SELECT * FROM recipe");
    return recipes;
}

async function retrieveRecipeById(id){
    const db = await dbPromise;

    const recipe = await db.get(
        `select * from recipe where id=${id}`
    )

    return recipe;
}

module.exports = {
    getAllRecipes,
    retrieveRecipeById
};

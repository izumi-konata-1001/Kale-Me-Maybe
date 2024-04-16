const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveRecipeById(id){
    const db = await dbPromise;

    const recipe = await db.get(
        `select * from recipe where id=${id}`
    )

    return recipe;
}

// Export functions.
module.exports = {
    retrieveRecipeById
};

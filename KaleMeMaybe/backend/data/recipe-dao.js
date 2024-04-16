const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


// Export functions.
module.exports = {
    getAllRecipes: async function(){
        const db = await dbPromise;
        const recipes = await db.all("SELECT * FROM recipe");
        return recipes;
    }
};

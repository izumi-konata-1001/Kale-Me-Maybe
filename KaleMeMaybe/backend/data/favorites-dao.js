const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

//retrive data of user's favorites
async function getFavorites() {
  try {
    const db = await dbPromise;
    console.log("after connected")

    const collections = await db.all(SQL`SELECT * FROM collection`);
    console.log(collections)
    
    return collections;
  } catch (error){
    console.error("Database error: ", error);
  }
}


// Export functions.
module.exports = {
  getFavorites,
};

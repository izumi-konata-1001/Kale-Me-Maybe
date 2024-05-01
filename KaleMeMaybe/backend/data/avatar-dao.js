const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// retrieve avatar by image path
async function retrieveAvatarByPath(avatarPath) {
  const db = await dbPromise;

  const [avatar] = await db.execute(
    SQL`SELECT * FROM avatar WHERE image_path = ${avatarPath}`
  );

  return avatar[0]; 
}

// Export functions.
module.exports = {
  retrieveAvatarByPath,
};
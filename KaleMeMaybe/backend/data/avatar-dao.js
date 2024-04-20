const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveAvatarByPath(avatarPath){
    const db = await dbPromise;

    const avatar = await db.get(
        SQL`SELECT * FROM avatar WHERE image_path = ${avatarPath}`
    )

    return avatar;
}

// Export functions.
module.exports = {
    retrieveAvatarByPath
};

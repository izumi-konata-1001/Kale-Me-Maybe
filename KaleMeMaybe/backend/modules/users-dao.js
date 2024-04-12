const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const bcrypt = require("bcryptjs");

async function retriveUser() {
  const db = await dbPromise;
  const user = await db.get(SQL`
        select * from users
        `);
  return Boolean(user);
}

// Export functions.
module.exports = {
  retriveUser
};

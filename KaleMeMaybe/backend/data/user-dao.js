const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function checkPassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

async function retrieveThirdPartyAccount(provider, provider_id) {
  const db = await dbPromise;
  const [rows] = await db.execute(
    `SELECT * FROM third_party_account WHERE provider_name = ? AND provider_user_id = ?`,
    [provider, provider_id]
  );
  return rows[0]; 
}

async function insertThirdPartyTable(user_id, provider, provider_id) {
  const db = await dbPromise;
  try {
    const [result] = await db.execute(
      `INSERT INTO third_party_account (user_id, provider_name, provider_user_id) VALUES (?, ?, ?)`,
      [user_id, provider, provider_id]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error("Error inserting to new third party table:", error);
    throw error;
  }
}

async function insertNewThirdUser(email) {
  const db = await dbPromise;
  try {
    const [result] = await db.execute(
      `INSERT INTO user (email, encrypted_password) VALUES (?, ?)`,
      [email, ""]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error("Error inserting new third party user:", error);
    throw error;
  }
}

async function insertNewUser(userData) {
  const db = await dbPromise;
  try {
    const { email, encrypted_password } = userData;
    const [result] = await db.execute(
      `INSERT INTO user (email, encrypted_password) VALUES (?, ?)`,
      [email, encrypted_password]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

async function retrieveUserAvatarById(avatar_id) {
  const db = await dbPromise;
  const [rows] = await db.execute(
    `SELECT * FROM avatar WHERE id = ?`,
    [avatar_id]
  );
  return rows[0]; 
}

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

async function retrieveUserByEmail(email) {
  const db = await dbPromise;
  const [rows] = await db.execute(
    `SELECT * FROM user WHERE email = ?`,
    [email]
  );
  return rows[0]; 
}

async function retrieveUserById(userId) {
  const db = await dbPromise;
  const [rows] = await db.execute(
    `SELECT * FROM user WHERE id = ?`,
    [userId]
  );
  return rows[0]; 
}

async function updateUserProfileById(
  id,
  name,
  bio,
  gender,
  birthDate,
  city,
  avatar_id
) {
  const db = await dbPromise;
  const [result] = await db.execute(
    `UPDATE user SET name = ?, bio = ?, gender = ?, birth_date = ?, city = ?, avatar_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [name, bio, gender, birthDate, city, avatar_id, id]
  );
  return result;
}

module.exports = {
  checkPassword,
  insertNewUser,
  hashPassword,
  retrieveUserAvatarById,
  generateToken,
  retrieveUserByEmail,
  retrieveUserById,
  updateUserProfileById,
  insertNewThirdUser,
  insertThirdPartyTable,
  retrieveThirdPartyAccount,
};
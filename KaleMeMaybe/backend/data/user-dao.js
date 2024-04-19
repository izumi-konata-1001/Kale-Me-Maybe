const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
// for authToken
const jwt = require('jsonwebtoken');
// for hash password
const bcrypt = require('bcrypt');
const saltRounds = 10; 

async function checkPassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

async function insertNewUser(userData) {

    const db = await dbPromise;
    try {
        const { email, encrypted_password} = userData;
        
        const result = await db.run(`
            INSERT INTO user (email, encrypted_password)
            VALUES (?, ?)
        `, [email, encrypted_password]);

        return { id: result.lastID };
    } catch (error) {
        console.error('Error inserting new user:', error);
        throw error; 
    }
}

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function retrieveUserAvatarById(avatar_id){
    const db = await dbPromise;

    const avatar = await db.get(
        SQL`SELECT * FROM avatar WHERE id = ${avatar_id}`
    )

    return avatar;
}

function generateToken(user) {
    const payload = {
        id: user.id,  
        email: user.email  
    };

    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
        expiresIn: '7d' 
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
}

async function retrieveUserByEmail(email){
    const db = await dbPromise;

    const user = await db.get(
        SQL`SELECT * FROM user WHERE email = ${email}`
    )

    return user;
}

async function retrieveUserById(userId){
    const db = await dbPromise;

    const user = await db.get(
        SQL`SELECT * FROM user WHERE id = ${userId}`
    )

    return user;
}

// Export functions.
module.exports = {
    checkPassword,
    insertNewUser,
    hashPassword,
    retrieveUserAvatarById,
    generateToken,
    retrieveUserByEmail,
    retrieveUserById
};

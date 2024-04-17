const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const jwt = require('jsonwebtoken');

async function retrieveUserAvatarById(id){
    const db = await dbPromise;

    const avatar = await db.get(
        SQL`SELECT * FROM avatar WHERE id = ${id}`
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

// Export functions.
module.exports = {
    retrieveUserAvatarById,
    generateToken,
    retrieveUserByEmail
};

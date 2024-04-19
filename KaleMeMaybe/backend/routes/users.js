const express = require("express");
const { retrieveUserByEmail, generateToken, retrieveUserAvatarById, hashPassword, insertNewUser, checkPassword } = require("../data/user-dao");
const router = express.Router();

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required." });
    }

    try {
        const user = await retrieveUserByEmail(email);

        if (!user) {
            return res.status(401).send({ message: "It seems you haven't join us." });
        }

        const isValid = await checkPassword(password, user.encrypted_password);
        if (!isValid) {
            return res.status(401).send({ message: "Wrong password!" });
        }

        // generate JWT after log in successfully
        const authToken = generateToken(user);
        const avatar = await retrieveUserAvatarById(user.avatar_id);

        res.status(200).send({ 
            message: "Login successful!", 
            authToken: authToken,
            username: user.name,
            useravatar: avatar.image_path,
            userid: user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post('/users/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required." });
    }

    try {
        const user = await retrieveUserByEmail(email);

        if (user) {
            return res.status(409).send({ message: "It seems you have joined us." });
        }

        const encrypted_password = await hashPassword(password);
        const newUser = await insertNewUser({email, encrypted_password});

        res.status(201).send({ 
            message: "User created successfully.", 
            userId: newUser.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;

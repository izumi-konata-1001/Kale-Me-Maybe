const express = require("express");
const { retrieveUserByEmail, generateToken, retrieveUserAvatarById } = require("../data/user-dao");
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

        if (user.encrypted_password !== password) {
            return res.status(401).send({ message: "Wrong password!" });
        }

        // generate JWT after log in successfully
        const authToken = generateToken(user);
        const avatar = await retrieveUserAvatarById(user.id);

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

module.exports = router;

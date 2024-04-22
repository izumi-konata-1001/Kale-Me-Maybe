const express = require("express");
const { retrieveUserByEmail, generateToken, retrieveUserAvatarById, hashPassword, insertNewUser, checkPassword, retrieveUserById, updateUserProfileById, insertThirdPartyTable, retrieveThirdPartyAccount, insertNewThirdUser } = require("../data/user-dao");
const { retrieveAvatarByPath } = require("../data/avatar-dao");
const router = express.Router();
// Google login
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
// Facebook login
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

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

router.get('/users/:userId', async (req, res) =>{
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send({ message: "Fail to get user id." });
    }

    try {
        const user = await retrieveUserById(userId);
        const avatar = await retrieveUserAvatarById(user.avatar_id);

        res.status(201).send({ 
            message: "User retrieved successfully.", 
            id: userId,
            name: user.name,
            bio: user.bio,
            gender: user.gender,
            birthDate: user.birth_date,
            city: user.city,
            avatarPath: avatar.image_path
        });
    } catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/users/updateprofile', async (req, res) => {
    const { id, name, bio, gender, birthDate, city, avatarPath} = req.body;

    try {
        const avatar =await retrieveAvatarByPath(avatarPath);
        const result = await updateUserProfileById(id, name, bio, gender, birthDate, city, avatar.id);

        res.status(201).send({ 
            message: "User profile updated successfully.",
            username: name,
            useravatar: avatarPath
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Google login
const oauth2Client = new OAuth2(
    '536497757195-m4gqdm1up3br3o2vtec9esvigjofr27q.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/api/auth/google/callback'
);

// get authorised url
function getGoogleAuthURL() {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email'
    ];
  
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes
    });
}

// Endpoint to provide the Google auth URL to the frontend
router.get('/auth/google/url', (req, res) => {
    const url = getGoogleAuthURL();
    res.json({ url });  // Send the URL back to the frontend
});

// callback
router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try{
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
    
        // Fetch the user's email
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const userInfo = await oauth2.userinfo.get();
        const userEmail = userInfo.data.email;
        const googleUserId = userInfo.data.id;

        let user = await retrieveUserByEmail(userEmail);
        let statusCode = 200;

        if (!user) {
            const newUser = await insertNewThirdUser(userEmail);
            const newUserId = newUser.id;
            user = await retrieveUserById(newUserId);

            await insertThirdPartyTable(newUserId, 'Google', googleUserId);
            statusCode = 201;
        }

        let account = await retrieveThirdPartyAccount('Google', googleUserId);
        if(!account){
            await insertThirdPartyAccount(user.id, 'Google', googleUserId);
        }

        const authToken = generateToken(user);
        const avatar = await retrieveUserAvatarById(user.avatar_id);
        const username = user.name;
        const useravatar = avatar.image_path;
        const userid = user.id;
        
        res.cookie('authToken', authToken, { httpOnly: false, secure: true, sameSite: 'strict' });
        res.redirect(`http://localhost:5173/login-success?username=${encodeURIComponent(username)}&useravatar=${encodeURIComponent(useravatar)}&userid=${userid}`);

    } catch(error){
        console.error('Failed to fetch user email:', error);
        res.status(500).send('Authentication failed');
    }
});

// passport for facebook login
passport.use(new FacebookStrategy({
    clientID: 2220830918250810,
    clientSecret: "9a97d6d3e03f3b129d2e1a0cd719a153",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;

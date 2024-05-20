const express = require("express");
const {
  retrieveUserByEmail,
  generateToken,
  retrieveUserAvatarById,
  hashPassword,
  insertNewUser,
  checkPassword,
  retrieveUserById,
  updateUserProfileById,
  insertThirdPartyTable,
  retrieveThirdPartyAccount,
  insertNewThirdUser,
} = require("../data/user-dao");
const { retrieveAvatarByPath } = require("../data/avatar-dao");
const router = express.Router();
// Google login
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
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
      userid: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/users/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  try {
    const user = await retrieveUserByEmail(email);

    if (user) {
      return res.status(409).send({ message: "It seems you have joined us." });
    }

    const encrypted_password = await hashPassword(password);
    const newUser = await insertNewUser({ email, encrypted_password });

    res.status(201).send({
      message: "User created successfully.",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/users/:userId", async (req, res) => {
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
      avatarPath: avatar.image_path,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/users/updateprofile", async (req, res) => {
  const { id, name, bio, gender, birthDate, city, avatarPath } = req.body;

  try {
    const avatar = await retrieveAvatarByPath(avatarPath);
    const result = await updateUserProfileById(
      id,
      name,
      bio,
      gender,
      birthDate,
      city,
      avatar.id
    );

    res.status(201).send({
      message: "User profile updated successfully.",
      username: name,
      useravatar: avatarPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Google login
const oauth2Client = new OAuth2(
  process.env.GOOGLE_APP_ID,
  process.env.GOOGLE_APP_SECRET,
  "http://kale-me-maybe.ap-southeast-2.elasticbeanstalk.com/api/auth/google/callback"
);

// get authorised url
function getGoogleAuthURL() {
  const scopes = ["https://www.googleapis.com/auth/userinfo.email"];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
}

// Endpoint to provide the Google auth URL to the frontend
router.get("/auth/google/url", (req, res) => {
  const url = getGoogleAuthURL();
  res.json({ url }); // Send the URL back to the frontend
});

// callback
router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch the user's email
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
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

      await insertThirdPartyTable(newUserId, "Google", googleUserId);
      statusCode = 201;
    }

    let account = await retrieveThirdPartyAccount("Google", googleUserId);
    if (!account) {
      await insertThirdPartyAccount(user.id, "Google", googleUserId);
    }

    const authToken = generateToken(user);
    const avatar = await retrieveUserAvatarById(user.avatar_id);
    const username = user.name;
    const useravatar = avatar.image_path;
    const userid = user.id;

    res.cookie("authToken", authToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });
    res.redirect(
      `http://d1isuxwjx7fugi.cloudfront.net/login-success?username=${encodeURIComponent(
        username
      )}&useravatar=${encodeURIComponent(useravatar)}&userid=${userid}&authToken=${authToken}`
    );
    console.log("after redirect")
  } catch (error) {
    console.error("Failed to fetch user email:", error);
    res.redirect(`http://d1isuxwjx7fugi.cloudfront.net/log-in`);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const userDao = require("../data/user-dao.js");
const favDao = require("../data/favorites-dao.js");

router.get("/", async function (req, res) {
  const user = req.headers["userid"];
  console.log("User ID from headers:", user);
  try {
    const favs = await favDao.getFavorites(user);
    console.log(favs);
    res.json(favs);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch favorites. " });
  }
});

module.exports = router;

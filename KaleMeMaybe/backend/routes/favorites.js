const express = require("express");
const router = express.Router();
const userDao = require("../data/user-dao.js");
const favDao = require("../data/favorites-dao.js");

router.use(express.json());

router.get("/", async function (req, res) {
  const user = req.headers["userid"];
  try {
    const favs = await favDao.getFavorites(user);
    res.json(favs);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch favorites. " });
  }
});

router.post("/", async function (req, res) {
  const user = req.body.user;
  const collectionName = req.body.name;
  console.log("user: ", user)
  console.log("collection: ", collectionName)

  try {
    const collections = await favDao.createCollection(user, collectionName);
    res.json(collections)
  } catch (error) {
    res.status(500).send({ error: "Failed to create a collection. " });
  }
})

module.exports = router;

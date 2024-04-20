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

  try {
    const collections = await favDao.createCollection(user, collectionName);
    res.json(collections);
  } catch (error) {
    res.status(500).send({ error: "Failed to create a collection. " });
  }
});

router.get("/search", async function (req, res) {
  const searchTerm = req.query.searchTerm;
  const userId = req.headers.userid;

  console.log("searchTerm", searchTerm);
  console.log("userid: ", userId);

  try {
    const result = await favDao.searchFavorites(userId, searchTerm);
    console.log("in router result: ", result);

    if (result.length === 0) {
      res.json({ message: "No recipes found matching your search criteria." });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to search in collections. " });
  }
});

module.exports = router;

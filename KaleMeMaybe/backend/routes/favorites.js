const express = require("express");
const router = express.Router();
const userDao = require("../data/user-dao.js");
const favDao = require("../data/favorites-dao.js");

router.get("http://localhost:5173/favorites", async function(req, res) {
    try {
        const favs = await favDao.getFavorites();
        res.json(favs);
    } catch(error) {
        res.status(500).send({ error: 'Failed to fetch favorites. ' });
    }
});

module.exports = router;
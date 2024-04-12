const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");

// create a test api
router.get("/", async function (req, res) {
  const currentUser = await userDao.retriveUser();
  
  res.json(currentUser);
});

module.exports = router;

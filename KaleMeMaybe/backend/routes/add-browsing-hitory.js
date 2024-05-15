const express = require("express");
const router = express.Router();
const historyDao = require("../data/history-dao.js");

router.post("/addBrowsingHistory", async (req, res) => {
  try {
    const { userId, id, timestamp } = req.body;
    console.log("before userId: " + userId + ", recipeId" + id + ", time: " + timestamp);
    if (!userId || !id || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("userId: " + userId + ", recipeId" + id + ", time: " + timestamp);
    await historyDao.addBrowsingHistory(userId, id, timestamp);
    console.log(" after userId: " + userId + ", recipeId" + id + ", time: " + timestamp);
    res.status(200).json({ message: "Browsing history added successfully" });
  } catch (error) {
    console.error("Error adding browsing history:", error);
    res.status(500).json({ error: "Failed to add browsing history" });
  }
});

module.exports = router;
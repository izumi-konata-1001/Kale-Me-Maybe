const express = require("express");
const router = express.Router();
const broDao = require("../data/browsing-history-dao.js");

router.get("/browsing", async (req, res) => {

     const user_id = req.body.userId;
    // const user_id = 1;
    try {
        const history = await broDao.getBrowsingHistory(user_id);

        if (history) {
          res.status(200).json(history);
          console.log(history);
        } else {
          res.status(404).json({ error: "Browsing histories are not found." });
          console.log("123");
        }
      } catch (error) {
        console.error("Error fetching Browsing history:", error);
        res.status(500).json({ error: "Failed to fetch Browsing histories." });
      }
    
  });

module.exports = router;

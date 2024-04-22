const express = require("express");
const router = express.Router();
const broDao = require("../data/browsing-history-dao.js");

router.get("/browsing", async (req, res) => {

     const user_id = req.body.userId;

    try {
      // res.status(200).json([{
      //   user_id : 1, 
      //   recipe_id: 1, 
      //   date: new Date(), 
      //   name: "meat",
      //   time_consuming: "25 min", 
      //   difficulty: "easy", 
      //   method: "balbalbal", 
      //   image_path: "https://www.researchgate.net/publication/367813651/figure/fig2/AS:11431281116808833@1675330640498/The-Tupian-languages-with-the-sub-branches-of-the-Mawe-Aweti-Tupi-Guarani-branch.ppm"
      // },{user_id : 2, 
      //   recipe_id: 2, 
      //   date: new Date(), 
      //   name: "vegetable",
      //   time_consuming: "12 min", 
      //   difficulty: "hard", 
      //   method: "balbalbal", 
      //   image_path: "https://www.researchgate.net/publication/367813651/figure/fig2/AS:11431281116808833@1675330640498/The-Tupian-languages-with-the-sub-branches-of-the-Mawe-Aweti-Tupi-Guarani-branch.ppm"}]);

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

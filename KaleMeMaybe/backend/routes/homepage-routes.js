const express = require("express");
const router = express.Router();

// test api health
router.get("/api/health", async (req, res) => {
  res.status(200).send("API is healthy!");
});


// recipe generator
router.post("/api/recipes/generate", async (req, res) => {
  const { messages } = req.body;
  try {
    fetchOpenAICompletionsStream(messages, (chunk) => {
      res.status(200).send(chunk);
    });
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    res.status(500).send("Error fetching data from OpenAI API.");
  }
});

module.exports = router;

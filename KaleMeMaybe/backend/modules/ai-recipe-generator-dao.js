import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

// call gpt api to generate recipe with ingredients
async function generateRecipeWithIngredients(ingredients) {
  const response = await openai.chat.completions.create({
    model: process.env.GPT_CHAT_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a product description and seed words, and your task is to generate product names.",
      },
      {
        role: "user",
        content:
          "Product description: A home milkshake maker\n    Seed words: fast, healthy, compact.",
      },
    ],
    temperature: 0.8,
    max_tokens: 64,
    top_p: 1,
  });
}

// Export functions.
module.exports = {
  generateRecipeWithIngredients,
};

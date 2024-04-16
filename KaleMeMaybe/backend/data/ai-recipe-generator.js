const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

const gpt_chat_model = process.env.GPT_CHAT_MODEL;
const gpt_chat_max_tokens = parseInt(process.env.GPT_CHAT_MAX_TOKENS, 10);
const gpt_chat_temperature = Number(process.env.GPT_CHAT_TEMPERATURE);

// call gpt api to generate recipe with ingredients
async function generateRecipeWithIngredients(ingredients) {
  // Create prompt for GPT
  const prompt = `Create a detailed vegetarian recipe using these ingredients: ${ingredients.join(
    ", "
  )}. Format the response as JSON with keys for recipe_name, cooking_time, difficulty, ingredients and method.
`;

  try {
    const response = await openai.chat.completions.create({
      model: gpt_chat_model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: gpt_chat_max_tokens,
      temperature: gpt_chat_temperature,
    });

    console.log("GPT response:", response);

    const recipe_generated = response.choices[0].message.content;
    console.log("Recipe generated:", recipe_generated);

    return recipe_generated;
  } catch (error) {
    console.error("Error calling OpenAI to generate recipe:", error);
    throw new Error("Failed to generate recipe");
  }
}

// Export functions.
module.exports = {
  generateRecipeWithIngredients,
};

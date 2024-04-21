const OpenAI = require("openai").default;
const https = require("https");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { promisify } = require("util");
const stream = require("stream");
const pipeline = promisify(stream.pipeline);

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

const gpt_chat_model = process.env.GPT_CHAT_MODEL;
const gpt_chat_max_tokens = parseInt(process.env.GPT_CHAT_MAX_TOKENS, 10);
const gpt_chat_temperature = Number(process.env.GPT_CHAT_TEMPERATURE);
const gpt_image_model = process.env.DALL_E_MODEL;
const gpt_image_size = process.env.DALL_E_IMAGE_SIZE;

// call gpt api to generate recipe with ingredients
async function generateRecipeWithIngredients(ingredients, existing_recipe_name) {
  // Create prompt for GPT
  let prompt = `
  Create a detailed vegetarian recipe using these ingredients: ${ingredients.join(
    ", "
  )}. Format the response as JSON with keys for recipe_name, cooking_time, difficulty, ingredients and steps. The "ingredients" field is an array of strings, each describing the handling and quantity of an ingredient. The "steps" field is an array of strings, where each string details a cooking step.
  `;

  // check if existing recipe name is provided
  if (existing_recipe_name && existing_recipe_name.length > 0) {
    prompt += ` The recipe name should not be ${existing_recipe_name.join(",")}.`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: gpt_chat_model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: gpt_chat_max_tokens,
      temperature: gpt_chat_temperature,
      response_format: { type: "json_object" },
    });

    const recipe_generated = response.choices[0].message.content;

    return recipe_generated;
  } catch (error) {
    console.error("Error calling OpenAI to generate recipe:", error);
    throw new Error("Failed to generate recipe");
  }
}

// generate recipe image using recipe name
async function generateRecipeImage(recipe) {
  // check if recipe is undefined
  if (!recipe) {
    throw new Error("Recipe is required.");
  }

  const recipeName = recipe.recipe_name;

  const prompt = `Create an image for a vegetarian recipe using data from the recipe: ${recipe}.`;
  try {
    const response = await openai.images.generate({
      model: gpt_image_model,
      prompt: prompt,
      size: gpt_image_size,
    });

    const image_generated_url = response.data[0].url;

    // download image and store in public folder
    const date = moment().format("YYYYMMDD");
    const safeRecipeName = recipeName.replace(/ /g, "_");
    const fileName = `${safeRecipeName}_${date}.png`;
    const savePath = path.join(
      __dirname,
      `../public/generated-images/${fileName}`
    );
    await downloadImage(image_generated_url, savePath);
    console.log("Image saved at:", savePath);

    // return image path
    return `/generated-images/${fileName}`;
  } catch (error) {
    console.error("Error calling OpenAI to generate image:", error);
    throw new Error("Failed to generate image");
  }
}

// Function to download and save the image
async function downloadImage(url, savePath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, async (response) => {
        try {
          const fileStream = fs.createWriteStream(savePath);
          await pipeline(response, fileStream);
          console.log("Download and save completed.");
          resolve(`/generated-images/${path.basename(savePath)}`);
        } catch (error) {
          console.error("Failed to download or save the image:", error.message);
          fs.unlink(savePath).catch(() => {});
          reject(error);
        }
      })
      .on("error", (error) => {
        console.error("Error during HTTP get request:", error.message);
        reject(error);
      });
  });
}

// Export functions.
module.exports = {
  generateRecipeWithIngredients,
  generateRecipeImage,
};

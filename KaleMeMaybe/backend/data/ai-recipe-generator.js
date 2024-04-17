const OpenAI = require("openai").default;
const https = require("https");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

const gpt_chat_model = process.env.GPT_CHAT_MODEL;
const gpt_chat_max_tokens = parseInt(process.env.GPT_CHAT_MAX_TOKENS, 10);
const gpt_chat_temperature = Number(process.env.GPT_CHAT_TEMPERATURE);
const gpt_image_model = process.env.DALL_E_MODEL;
const gpt_image_size = process.env.DALL_E_IMAGE_SIZE;

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
      response_format: { type: "json_object" },
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

// generate recipe image using recipe name
async function generateRecipeImage(recipeName) {
  const prompt = `Create an image for a vegetarian recipe named ${recipeName}.`;
  try {
    // const response = await openai.images.generate({
    //   model: gpt_image_model,
    //   prompt: prompt,
    //   size: gpt_image_size,
    // });
    // console.log("Image generated response:", response);

    // const image_generated_url = response.data[0].url;





    const image_generated_url =
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-zl2wR0FxPJZlUepsLLr8FU82/user-j7KBkDmCW1JNcw6bwTbwD3u5/img-Iuikw5RL8KCf4RXAARGJDyaN.png?st=2024-04-16T22%3A32%3A10Z&se=2024-04-17T00%3A32%3A10Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-16T08%3A16%3A44Z&ske=2024-04-17T08%3A16%3A44Z&sks=b&skv=2021-08-06&sig=lICAKnucdTXsdF44qgxLTVZhOmrpNC/Pm3SkVLxus0s%3D";




    // download image and store in public folder
    const date = moment().format("YYYYMMDD");
    const safeRecipeName = recipeName.replace(/ /g, "_");
    const fileName = `${safeRecipeName}_${date}.png`;
    console.log("Generated image file name:", fileName);
    const savePath = path.join(
      __dirname,
      `../public/generated-images/${fileName}`
    );
    downloadImage(image_generated_url, savePath);
    console.log("Image saved at:", savePath);

    // return image url
    return image_generated_url;
  } catch (error) {
    console.error("Error calling OpenAI to generate image:", error);
    throw new Error("Failed to generate image");
  }
}

// Function to download and save the image
const downloadImage = (url, savePath) => {
  const file = fs.createWriteStream(savePath);
  https
    .get(url, (response) => {
      response.pipe(file);

      // Close the file once writing is complete
      file.on("finish", () => {
        file.close();
        console.log("Download and save completed.");
      });
    })
    .on("error", (err) => {
      // Delete the file async. (E.g., if it fails partially)
      fs.unlink(savePath, () => {
        console.error("Failed to download or save the image:", err.message);
      });
    });
};

// Export functions.
module.exports = {
  generateRecipeWithIngredients,
  generateRecipeImage,
};

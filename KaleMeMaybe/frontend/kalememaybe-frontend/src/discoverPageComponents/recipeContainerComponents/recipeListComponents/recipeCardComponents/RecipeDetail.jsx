import RecipeName from "./recipeDetailComponents/RecipeName";
import RecipeInfo from "./recipeDetailComponents/RecipeInfo";
import RecipeDescripition from "./recipeDetailComponents/RecipeDescripition";

const RecipeDetail = ({ recipe }) => {
  return (
    <div className="flex flex-col">
      <RecipeName recipe={recipe} />
      <RecipeInfo recipe={recipe} />
      <RecipeDescripition recipe={recipe} />
    </div>
  );
};
export default RecipeDetail;

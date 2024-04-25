import RecipeDifficulty from "./recipeInfoLeftComponents/RecipeDifficulty";
import RecipeTimeConsume from "./recipeInfoLeftComponents/RecipeTimeConsume";
import RecipeScoreIcon from "../../../../../../component/RecipeScoreIcon";

const RecipeInfoLeft = ({ recipe }) => {
  const recipeId = recipe.id;

  return (
    <div className="flex items-start space-x-1">
      <RecipeTimeConsume recipe={recipe} />
      <RecipeDifficulty recipe={recipe} />
      <RecipeScoreIcon recipeId={recipeId} />
    </div>
  );
};
export default RecipeInfoLeft;

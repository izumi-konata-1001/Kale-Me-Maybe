import RecipeImage from "./recipeCardComonents/RecipeImage";
import RecipeDetail from "./recipeCardComonents/RecipeDetails";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="block w-[270px] h-[350px]">
      <div>
        <Link to={`/recipe/${recipe.id}`}>
          <RecipeImage recipe={recipe} />
        </Link>
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
};
export default RecipeCard;

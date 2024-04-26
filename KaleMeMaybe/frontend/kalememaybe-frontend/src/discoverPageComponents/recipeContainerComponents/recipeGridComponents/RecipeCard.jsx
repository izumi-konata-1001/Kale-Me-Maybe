import RecipeImage from "./recipeCardComonents/RecipeImage";
import RecipeDetail from "./recipeCardComonents/RecipeDetails";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, onToggleSelect, isSelected, showCheckboxes }) => {
  return (
    <div className="block w-[270px] h-[350px]">
      {showCheckboxes && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(recipe.id)}
          className="mb-2"
        />
      )}
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

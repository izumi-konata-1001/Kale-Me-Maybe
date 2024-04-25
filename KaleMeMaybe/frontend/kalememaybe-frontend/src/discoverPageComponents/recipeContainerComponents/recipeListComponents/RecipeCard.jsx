import RecipeDetail from "./recipeCardComponents/RecipeDetail";
import RecipeImageWithBorder from "../../../component/RecipeImageWithBorder";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="flex flex-col items-center w-full mx-auto p-4 border border-grey rounded-lg shadow-md list-s:flex-row ">
      <div className="flex justify-center flex-initial pt-2 list-l:w-2/6 list-m:w-1/2">
        <Link to={`/recipe/${recipe.id}`}>
          <RecipeImageWithBorder recipe={recipe} />
        </Link>
      </div>
      <div className="flex-initial pb-2 list-l: w-4/6 pl-5 list-m: w-1/2">
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
};
export default RecipeCard;

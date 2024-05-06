import RecipeDetail from "./recipeCardComponents/RecipeDetail";
import RecipeImageWithBorder from "../../../component/RecipeImageWithBorder";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="flex flex-col w-full p-3 border border-grey rounded-lg shadow-md list-s:flex-row list-s:justify-center list-xs:justify-center">
      <div className="flex justify-center flex-initial pt-2 list-l:w-2/6 list-m:w-1/2 list-m:pl-2">
        <Link to={`/recipe/${recipe.id}`}>
          <RecipeImageWithBorder recipe={recipe} />
        </Link>
      </div>
      <div className="w-full flex-initial pb-2 list-l: w-4/6 list-l:pl-5 list-m:pl-5 list-s:pl-5">
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
};
export default RecipeCard;

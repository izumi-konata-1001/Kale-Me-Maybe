/* eslint-disable react/prop-types */
import RecipeImage from "./recipeCardComonents/RecipeImage";
import RecipeDetail from "./recipeCardComonents/RecipeDetails";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, onToggleSelect, isSelected, showCheckboxes }) => {
  return (
    <div className="block w-[270px] h-[360px] relative">
      {showCheckboxes && (      
        <div className="inline-flex items-center absolute top-0 left-0">
          <label
            className="relative flex items-center p-3 rounded-full cursor-pointer"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(recipe.id)}
              className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-dark checked:bg-green-dark checked:before:bg-green-dark hover:before:opacity-0"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
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

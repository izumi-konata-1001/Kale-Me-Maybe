import RecipeDifficulty from "./recipeInfoComponents/RecipeDifficulty";
import RecipeScoreIcon from "../../../../../component/RecipeScoreIcon.jsx";
import RecipeTimeConsume from "./recipeInfoComponents/RecipeTimeConsume";
import RecipeFavouriteIcon from "../../../../../component/RecipeFavouriteIcon.jsx";

import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider.jsx";

const RecipeInfo = ({ recipe }) => {
  const recipeId = recipe.id;
  const { userId } = useContext(AuthContext);
  return (
    <div className="flex justify-start gap-x-2 text-sm items-center">
      <div className="whitespace-nowrap">
        <RecipeDifficulty recipe={recipe} />
      </div>
      <div className="pl-2 whitespace-nowrap">
        <RecipeTimeConsume recipe={recipe} />
      </div>
      <div className="pl-2 whitespace-nowrap">
        <RecipeScoreIcon recipeId={recipeId} />
      </div>
      <div className="pl-3 whitespace-nowrap">
        {userId && (
          <RecipeFavouriteIcon
            recipeId={recipe.id}
            isFavorited={recipe.favouriteState}
          />
        )}
      </div>
    </div>
  );
};
export default RecipeInfo;

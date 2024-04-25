import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthProvider.jsx";
import RecipeFavouriteIcon from "../../../../../../component/RecipeFavouriteIcon.jsx";

const RecipeInfoRight = ({ recipe }) => {
  const { userId } = useContext(AuthContext);

  return (
    <div className="flex justify-end items-center pr-1">
      {userId && (
        <RecipeFavouriteIcon
          recipeId={recipe.id}
          isFavorited={recipe.favouriteState}
        />
      )}
    </div>
  );
};

export default RecipeInfoRight;

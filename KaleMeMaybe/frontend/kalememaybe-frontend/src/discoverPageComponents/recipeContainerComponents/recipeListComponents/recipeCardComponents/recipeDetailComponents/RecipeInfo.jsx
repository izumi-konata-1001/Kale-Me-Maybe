import RecipeDifficulty  from "./recipeInfoComponents/RecipeDifficulty";
import RecipeFavouriteIcon from "../../../../../component/RecipeFavouriteIcon.jsx";
import RecipeScoreIcon from "../../../../../component/RecipeScoreIcon.jsx";
import RecipeTimeConsume from "./recipeInfoComponents/RecipeTimeConsume";

const RecipeInfo = ({recipe}) => {
    return(
        <div className="flex justify-start gap-x-2 text-sm items-center">
            <div>
                <RecipeDifficulty recipe={recipe}/>
            </div>
            <div className="pl-2">
                <RecipeTimeConsume recipe={recipe}/>
            </div>
            <div className="pl-2">
                <RecipeScoreIcon recipe={recipe}/>
            </div>
            <div className="pl-5">
                <RecipeFavouriteIcon recipe={recipe}/>
            </div>
        </div>
    );
}
export default RecipeInfo;
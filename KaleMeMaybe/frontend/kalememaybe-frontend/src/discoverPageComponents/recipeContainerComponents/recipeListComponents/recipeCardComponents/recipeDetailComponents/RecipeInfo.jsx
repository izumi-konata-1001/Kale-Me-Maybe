import RecipeDifficulty  from "./recipeInfoComponents/RecipeDifficulty";
import RecipeFavouriteIcon from "../../../../../component/RecipeFavouriteIcon.jsx";
import RecipeScoreIcon from "../../../../../component/RecipeScoreIcon.jsx";
import RecipeTimeConsume from "./recipeInfoComponents/RecipeTimeConsume";

import { useContext } from 'react';
import { AuthContext } from '../../../../../contexts/AuthProvider.jsx';

const RecipeInfo = ({recipe}) => {
    const recipeId = recipe.id;
    const { userId } = useContext(AuthContext);
    return(
        <div className="flex justify-start gap-x-2 text-sm items-center">
            <div>
                <RecipeDifficulty recipe={recipe}/>
            </div>
            <div className="pl-2">
                <RecipeTimeConsume recipe={recipe}/>
            </div>
            <div className="pl-2">
                <RecipeScoreIcon recipeId={recipeId}/>
            </div>
            <div className="pl-3">
                {userId && <RecipeFavouriteIcon recipe={recipe}/>}
            </div>
        </div>
    );
}
export default RecipeInfo;
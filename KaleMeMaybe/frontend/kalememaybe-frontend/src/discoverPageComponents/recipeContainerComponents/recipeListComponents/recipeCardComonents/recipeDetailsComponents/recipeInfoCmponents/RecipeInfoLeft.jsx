import RecipeDifficulty from './recipeInfoLeftComponents/RecipeDifficulty';
import RecipeScoreIcon from './recipeInfoLeftComponents/RecipeScoreIcon';
import RecipeTimeConsume from './recipeInfoLeftComponents/RecipeTimeConsume';

const RecipeInfoLeft = ({recipe}) => {
    return(
        <div className="flex items-start space-x-1">
            <RecipeTimeConsume recipe={recipe}/>
            <RecipeDifficulty recipe={recipe}/>
            <RecipeScoreIcon recipe={recipe}/>
        </div>
    );
}
export default RecipeInfoLeft;
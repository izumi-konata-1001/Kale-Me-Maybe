import RecipeDifficulty from './recipeInfoLeftComponents/RecipeDifficulty';
import RecipeScoreIcon from './recipeInfoLeftComponents/RecipeScoreIcon';
import RecipeTimeConsume from './recipeInfoLeftComponents/RecipeTimeConsume';

const RecipeInfoLeft = ({recipe}) => {
    return(
        <div className="flex items-start space-x-0.5">
            <RecipeDifficulty recipe={recipe}/>
            <RecipeScoreIcon recipe={recipe}/>
            <RecipeTimeConsume recipe={recipe}/>
        </div>
    );
}
export default RecipeInfoLeft;

/*
            <RecipeDifficulty recipe={recipe}/>
            <RecipeScoreIcon recipe={recipe}/>
            <RecipeTimeConsume recipe={recipe}/>
            */
import RecipeImage from './recipeCardComonents/RecipeImage'
import RecipeDetail from './recipeCardComonents/RecipeDetails'
const RecipeCard = ({recipe}) => {
    return(
    <div>
        <RecipeImage recipe={recipe}/>
        <RecipeDetail recipe={recipe}/>
    </div>
    );
}
export default RecipeCard;
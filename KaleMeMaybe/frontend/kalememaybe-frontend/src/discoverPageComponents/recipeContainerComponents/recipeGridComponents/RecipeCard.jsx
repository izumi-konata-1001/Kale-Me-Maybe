import RecipeImage from './recipeCardComonents/RecipeImage'
import RecipeDetail from './recipeCardComonents/RecipeDetails'
import { Link } from 'react-router-dom';

const RecipeCard = ({recipe}) => {
    return(
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
        <div>
            <RecipeImage recipe={recipe}/>
            <RecipeDetail recipe={recipe}/>
        </div>
    </Link>
    );
}
export default RecipeCard;
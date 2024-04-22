import RecipeImage from './recipeCardComponents/RecipeImage'
import RecipeDetail from './recipeCardComponents/RecipeDetail'
import { Link } from 'react-router-dom';

const RecipeCard = ({recipe}) => {
    return (
        <Link to={`/recipe/${recipe.id}`} className="recipe-card">
        <div className="w-full mx-auto p-4 border border-grey rounded-lg shadow-md flex items-center space-x-4"> {/* Use items-stretch to make children fill the height */}
            <div className="w-2/6">
                <RecipeImage recipe={recipe} />
            </div>
            <div className="w-4/6">
                <RecipeDetail recipe={recipe} />
            </div>
        </div>
        </Link>
    );
}
export default RecipeCard;

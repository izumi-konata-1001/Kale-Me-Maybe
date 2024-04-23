import RecipeName from './recipeDetailsComponents/RecipeName'
import RecipeInfo from './recipeDetailsComponents/RecipeInfo'
import { Link } from 'react-router-dom';

const RecipeDetail = ({recipe}) => {
    return(
        <div className="flex flex-col justify-between">
            <Link to={`/recipe/${recipe.id}`}><RecipeName recipe={recipe} /></Link>
            <RecipeInfo recipe={recipe} />
        </div>
    );
}
export default RecipeDetail;
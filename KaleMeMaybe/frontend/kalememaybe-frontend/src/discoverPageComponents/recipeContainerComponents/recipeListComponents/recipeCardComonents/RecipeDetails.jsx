import RecipeName from './recipeDetailsComponents/RecipeName'
import RecipeInfo from './recipeDetailsComponents/RecipeInfo'

const RecipeDetail = ({recipe}) => {
    return(
        <div className="flex flex-col justify-between">
            <RecipeName recipe={recipe} />
            <RecipeInfo recipe={recipe} />
        </div>
    );
}
export default RecipeDetail;
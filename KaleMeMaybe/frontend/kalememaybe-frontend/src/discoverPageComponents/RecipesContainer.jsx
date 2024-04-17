import SortOptions from './recipeContainerComponents/SortOptions'
import RecipeList from './recipeContainerComponents/RecipeList'

const RecipeArea = ({recipes}) => {
    return(
        <div className="flex flex-col items-center justify-center gap-5">
            <SortOptions />
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default RecipeArea;
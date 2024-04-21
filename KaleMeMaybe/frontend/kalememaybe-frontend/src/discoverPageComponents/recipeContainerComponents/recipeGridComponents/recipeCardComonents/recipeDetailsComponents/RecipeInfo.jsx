// import RecipeInfoLeft from './recipeInfoCmponents/RecipeInfoLeft';
import RecipeInfoRight from './recipeInfoCmponents/RecipeInfoRight';

const RecipeInfo = ({recipe}) => {
    return(
        <div className="flex justify-between items-center text-sm">
            {/* <RecipeInfoLeft recipe={recipe} /> */}
            <RecipeInfoRight recipe={recipe} />
        </div>
    );
}
export default RecipeInfo;
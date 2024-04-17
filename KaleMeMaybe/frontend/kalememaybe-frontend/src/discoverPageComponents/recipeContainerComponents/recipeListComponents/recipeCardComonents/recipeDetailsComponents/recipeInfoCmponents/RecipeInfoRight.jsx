import RecipeFavouriteIcon from './recipeInfoRightComponents/RecipeFavouriteIcon'

const RecipeInfoRight = ({recipe}) => {
    return(
        <div className="flex justify-end">
            <RecipeFavouriteIcon recipe={recipe}/>
        </div>
    );
}
export default RecipeInfoRight;


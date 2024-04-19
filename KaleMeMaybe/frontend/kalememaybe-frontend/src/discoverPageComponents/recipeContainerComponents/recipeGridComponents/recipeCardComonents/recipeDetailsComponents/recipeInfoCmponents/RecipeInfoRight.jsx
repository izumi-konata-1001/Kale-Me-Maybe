import RecipeFavouriteIcon from "../../../../../../component/RecipeFavouriteIcon.jsx";

const RecipeInfoRight = ({recipe}) => {
    return(
        <div className="flex justify-end items-center">
            <RecipeFavouriteIcon recipe={recipe}/>
        </div>
    );
}
export default RecipeInfoRight;


import RecipeImageWithBorder from '../../../../component/RecipeImageWithBorder'

const RecipeImage = ({recipe}) => {
    return (
        <div className="flex items-center justify-center p-1">
            <RecipeImageWithBorder recipe={recipe}/>
        </div>
    );
}
export default RecipeImage;


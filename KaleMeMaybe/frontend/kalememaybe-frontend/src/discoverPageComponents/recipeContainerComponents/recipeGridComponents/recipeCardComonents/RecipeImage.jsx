const RecipeImage = ({recipe}) => {
    return(
        <div className="bg-transparent rounded-lg shadow-lg">
            <img src={recipe.image_path}
            alt={recipe.name}
            className="object-cover rounded-lg border-4 border-green-dark" // The image will be fully round
            style={{ width: '100%', height: 'auto' }} // Ensuring the image scales correctly
            />
        </div>
    );
}
export default RecipeImage;
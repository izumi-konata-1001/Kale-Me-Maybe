const RecipeImage = ({recipe}) => {
    return(
        <div className="bg-green-dark p-1 rounded-lg shadow-lg">
            <img src={recipe.image_path}
            alt={recipe.name}
            className="object-cover rounded-lg" // The image will be fully round
            style={{ width: '100%', height: 'auto' }} // Ensuring the image scales correctly
            />
        </div>
    );
}
export default RecipeImage;
const RecipeImage = ({recipe}) => {
    return (
        <div className="flex items-center justify-center p-1">
            <div className="bg-transparent rounded-xl shadow-lg" style={{ width: '250px', height: '250px' }}>
                <img src={recipe.image_path}
                alt={recipe.name}
                className="object-cover border border-green-dark border-4 rounded-xl h-full w-full" // Make the image fill its container
                />
            </div>
        </div>
    );
}
export default RecipeImage;


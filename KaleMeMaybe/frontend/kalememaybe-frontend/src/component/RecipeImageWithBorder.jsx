const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const RecipeImageWithBorder = ({recipe}) => {
    const imagePath = `${API_BASE_URL}/${recipe.image_path}`;

    return (
        <div className="bg-transparent rounded-xl shadow-lg" style={{ width: '250px', height: '250px' }}>
            <img src={imagePath}
                alt={recipe.name}
                className="object-cover border border-green-dark border-4 rounded-xl h-full w-full" // Make the image fill its container
            />
        </div>
    );
}
export default  RecipeImageWithBorder;
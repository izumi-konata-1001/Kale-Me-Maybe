const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const RecipeImageWithBorder = ({recipe}) => {
    const imagePath = `${API_BASE_URL}/${recipe.image_path}`;

    return (
        <div className="bg-transparent rounded-xl shadow-lg flex justify-center items-center" style={{ width: '270px', height: '270px' }}>
            <img src={imagePath}
                alt={recipe.name}
                className="object-cover border border-green-dark border-4 rounded-xl h-full w-full hover:border-green-light cursor-pointer" // Make the image fill its container
            />
        </div>
    );
}
export default  RecipeImageWithBorder;
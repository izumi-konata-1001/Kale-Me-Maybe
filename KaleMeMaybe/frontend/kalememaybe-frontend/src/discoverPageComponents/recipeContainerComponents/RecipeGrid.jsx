import RecipeCard from './recipeGridComponents/RecipeCard';


const RecipeGrid = ({recipes}) => {
    return (
        // Add responsive classes for Tailwind CSS
        <div className="grid grid-cols-1 gap-8 s:grid-cols-2 m:grid-cols-3">
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeGrid;
import RecipeCard from "./recipeGridComponents/RecipeCard";

const RecipeGrid = ({ recipes, onToggleSelect, isSelected, showCheckboxes }) => {
  return (
    <div className="grid grid-cols-1 gap-8 s:grid-cols-2 m:grid-cols-3 dark:text-white">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onToggleSelect={onToggleSelect} isSelected={isSelected} showCheckboxes={showCheckboxes} />
      ))}
    </div>
  );
};

export default RecipeGrid;

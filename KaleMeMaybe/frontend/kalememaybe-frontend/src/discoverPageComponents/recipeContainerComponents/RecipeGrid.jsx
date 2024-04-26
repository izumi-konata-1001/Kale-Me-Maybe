import RecipeCard from "./recipeGridComponents/RecipeCard";

const RecipeGrid = ({ recipes, onToggleSelect, isSelected, showCheckboxes }) => {
  return (
    <div className="grid grid-cols-1 gap-8 s:grid-cols-2 m:grid-cols-3">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} onToggleSelect={onToggleSelect} isSelected={isSelected} showCheckboxes={showCheckboxes} />
      ))}
    </div>
  );
};

export default RecipeGrid;

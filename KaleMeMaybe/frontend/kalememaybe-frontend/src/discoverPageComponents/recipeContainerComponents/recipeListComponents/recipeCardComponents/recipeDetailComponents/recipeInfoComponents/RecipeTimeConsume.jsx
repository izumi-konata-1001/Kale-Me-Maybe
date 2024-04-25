const RecipeTimeConsume = ({ recipe }) => {
  return (
    <div className="px-2 py-1 rounded-full bg-green-light text-green-dark">
      <span>{recipe.time_consuming}</span>
    </div>
  );
};
export default RecipeTimeConsume;

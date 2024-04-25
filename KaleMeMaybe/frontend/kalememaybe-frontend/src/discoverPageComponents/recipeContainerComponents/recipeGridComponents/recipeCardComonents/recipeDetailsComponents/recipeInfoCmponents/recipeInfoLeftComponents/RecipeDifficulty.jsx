const RecipeDifficulty = ({ recipe }) => {
  return (
    <div className="px-2 py-1 rounded-full bg-green-light text-green-dark">
      <span>{recipe.difficulty}</span>
    </div>
  );
};
export default RecipeDifficulty;

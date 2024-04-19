import React from "react";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;

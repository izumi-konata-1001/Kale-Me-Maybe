import React from "react";

const RecipeCard = ({ recipe, onClick }) => {
  if (!recipe) return null;

  return (
    <div
      className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg my-6 bg-white text-center cursor-pointer"
      onClick={() => onClick(recipe.id)}
    >
      <div className="p-2">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="object-cover border-4 border-green-700 rounded-lg mx-auto"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "12rem",
          }}
        />
      </div>
      <div className="px-6">
        <div className="flex justify-center items-center space-x-4 mb-2">
          <span className="inline-block bg-green-light text-green-dark rounded-full px-3 py-1 text-sm font-semibold">
            {recipe.time_consuming}
          </span>
          <span className="inline-block bg-green-light text-green-dark rounded-full px-3 py-1 text-sm font-semibold">
            {recipe.difficulty}
          </span>
        </div>
        <div className="font-bold text-xl mb-2">{recipe.name}</div>
      </div>
    </div>
  );
};

export default RecipeCard;

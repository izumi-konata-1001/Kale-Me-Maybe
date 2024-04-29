import React from "react";
import RecipeCard from "./recipeListComponents/RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <div className="flex flex-col justify-center gap-5 w-full dark:text-white">
      {recipes.map((recipe, index) => (
        <div key={index}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

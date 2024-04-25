// RecipesContainer.js
import React, { useState } from "react";
import RecipeOptions from "./recipeContainerComponents/RecipeOptions";
import RecipeGrid from "./recipeContainerComponents/RecipeGrid";
import RecipeList from "./recipeContainerComponents/RecipeList";

const RecipesContainer = ({ recipes, onSortChange }) => {
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="pb-3">
        <RecipeOptions
          activeView={activeView}
          setActiveView={setActiveView}
          onSortChange={onSortChange}
        />
      </div>
      {activeView === "grid" ? (
        <RecipeGrid recipes={recipes} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
};

export default RecipesContainer;

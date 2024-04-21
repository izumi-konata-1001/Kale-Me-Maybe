import React from "react";
import IngredientAutocomplete from "./IngredientAutocomplete";

const SelectedIngredientsBar = ({
  ingredients,
  onRemoveIngredient,
  onSearch,
  onIngredientSearchChange,
  searchValue,
  isLoading,
  setSearchValue,
  suggestions,
  onSelectIngredient,
}) => {
  return (
    <div className="flex flex-col mt-6 mb-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex-grow flex flex-wrap items-center gap-2 p-2 border border-gray-300 bg-gray-100 rounded">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center bg-green-dark text-white rounded-full px-3 py-1"
            >
              {ingredient.name}
              <button
                onClick={() => onRemoveIngredient(ingredient)}
                className="ml-2"
              >
                {" "}
                X{" "}
              </button>
            </div>
          ))}
          <input
            type="text"
            value={searchValue}
            onChange={onIngredientSearchChange}
            className="flex-1 p-1  bg-gray-100 focus:outline-none"
            placeholder={
              ingredients.length === 0 ? "What’s in your fridge?" : ""
            }
          />
        </div>
        <button
          className="bg-green-dark hover:bg-green-light text-white font-bold py-2 px-4 rounded ml-2 min-w-max"
          onClick={onSearch}
          disabled={ingredients.length === 0 || isLoading}
        >
          Let's cook
        </button>
      </div>
      <IngredientAutocomplete
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        suggestions={suggestions}
        onSelect={onSelectIngredient}
      />
    </div>
  );
};

export default SelectedIngredientsBar;

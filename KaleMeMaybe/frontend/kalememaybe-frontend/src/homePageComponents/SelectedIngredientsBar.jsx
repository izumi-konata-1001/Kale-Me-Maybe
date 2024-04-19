import React from "react";

const SelectedIngredientsBar = ({
  ingredients,
  onRemoveIngredient,
  onSearch,
  onIngredientSearchChange,
  searchValue,
}) => {
  return (
    <div className="flex flex-row items-center justify-between mt-6 mb-4">
      <div className="flex-grow flex flex-wrap items-center gap-2 p-2 border border-gray-300  bg-gray-100 rounded">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center bg-green-dark text-white rounded-full px-3 py-1"
          >
            {ingredient}
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
          placeholder={ingredients.length === 0 ? "What’s in your fridge?" : ""}
        />
      </div>
      <button
        className="bg-green-dark hover:bg-green-light text-white font-bold py-2 px-4 rounded ml-2 min-w-max"
        onClick={onSearch}
      >
        Let's cook
      </button>
    </div>
  );
};

export default SelectedIngredientsBar;

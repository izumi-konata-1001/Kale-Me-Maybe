// IngredientAutocomplete.jsx
import React from "react";

const IngredientAutocomplete = ({
  searchValue,
  setSearchValue,
  suggestions,
  onSelect,
}) => {
  const handleSelect = (item) => {
    onSelect(item); // Handle selecting an item
    setSearchValue(""); // Optionally clear the input after selection
  };

  return (
    <div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientAutocomplete;

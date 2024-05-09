// IngredientAutocomplete.jsx
import React, { useState, useEffect, useRef } from "react";

const IngredientAutocomplete = ({
  searchValue,
  setSearchValue,
  suggestions,
  onSelect,
}) => {
  const ref = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchValue("");
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchValue]);

  const handleSelect = (item) => {
    onSelect(item); // Handle selecting an item
    setSearchValue(""); // Optionally clear the input after selection
    setShowSuggestions(false);
  };

  return (
    <div ref={ref} className="relative w-full">
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

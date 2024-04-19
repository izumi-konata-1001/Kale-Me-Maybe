import React from "react";

const Ingredient = ({ name, onSelectIngredient, image }) => {
  return (
    <div
      className="ingredient flex flex-col items-center justify-center bg-white border-2 border-green-dark text-gray-700 px-4 py-3 rounded-lg shadow hover:border-green-light cursor-pointer"
      onClick={() => onSelectIngredient(name)}
      style={{
        width: "100%", // Take the full width of the grid column
      }}
    >
      <img
        src={image}
        alt={name}
        className="object-contain h-full w-full" // This will prevent stretching
        style={{ maxWidth: "76%", maxHeight: "76%" }} // Slightly smaller than the container
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default Ingredient;

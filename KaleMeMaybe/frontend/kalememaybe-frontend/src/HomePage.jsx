import React, { useState } from "react";
import Ingredient from "./homePageComponents/Ingredient";
import RecipeCard from "./homePageComponents/RecipeCard";
import SelectedIngredientsBar from "./homePageComponents/SelectedIngredientsBar";

const ingredientList = [
  { id: 1, name: "Tomato" },
  { id: 2, name: "Corn" },
  { id: 3, name: "Fennel" },
  { id: 4, name: "Peas" },
  { id: 5, name: "Lettuce" },
  { id: 6, name: "Cucumber" },
  { id: 7, name: "Potato" },
  { id: 8, name: "Pumpkin" },
  { id: 9, name: "Beetroot" },
  { id: 10, name: "Garlic" },
  { id: 11, name: "Onion" },
  { id: 12, name: "Cauliflower" },
  { id: 13, name: "Eggplant" },
  { id: 14, name: "Capsicum" },
  { id: 15, name: "Kale" },
  { id: 16, name: "Asparagus" },
  { id: 17, name: "Spinach" },
  { id: 18, name: "Tofu" },
];

export default function HomePage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Mock data for recent searches
  const mockRecentSearches = [
    "Chicken + Broccoli + Garlic",
    "Shrimp + Coconut Milk + Curry",
    "Pork + Apple + Cinnamon",
  ];

  // Function to handle clicking on a recent search
  const handleRecentSearchClick = (search) => {
    const ingredientsFromSearch = search.split(" + ");
    setSelectedIngredients(ingredientsFromSearch);
    setSearchValue(""); // Clear the search input
  };

  const handleIngredientSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelectIngredient = (ingredientName) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredientName)) {
        return prev;
      }
      return [...prev, ingredientName];
    });
  };

  const handleRemoveIngredient = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientName)
    );
  };

  const handleSearch = async () => {
    // 这里应该是一个调用后端API的函数
    // 下面是模拟的响应
    const fakeApiResponse = {
      title: "Vegetarian Lasagna",
      description: "A delicious and hearty vegetarian option.",
      image: "/path-to-lasagna-image.jpg", // 使用你的图片路径
      // ...其他数据
    };
    setRecipes([fakeApiResponse]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center mb-4">Pantry</h1>
      <p className="text-center mb-4">
        You have added {selectedIngredients.length} ingredient
        {selectedIngredients.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {ingredientList.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            name={ingredient.name}
            onSelectIngredient={handleSelectIngredient}
            image={`/basic-ingredient-images/${ingredient.name}.png`}
          />
        ))}
      </div>

      <SelectedIngredientsBar
        ingredients={selectedIngredients}
        onRemoveIngredient={handleRemoveIngredient}
        onSearch={handleSearch}
        onIngredientSearchChange={handleIngredientSearchChange}
        searchValue={searchValue}
      />
      <div>{recipes.length > 0 && <RecipeCard recipe={recipes[0]} />}</div>

      <div className="my-4">
        <div className="text-gray-500 mb-2">Recent Searches:</div>
        <div className="flex flex-wrap gap-2">
          {mockRecentSearches.map((search, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-100 border border-green-light text-gray-600 text-sm rounded-full cursor-pointer hover:border-green-dark"
              onClick={() => handleRecentSearchClick(search)}
            >
              {search}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

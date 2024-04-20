import React, { useState, useEffect } from "react";

import Ingredient from "./homePageComponents/Ingredient";
import RecipeCard from "./homePageComponents/RecipeCard";
import SelectedIngredientsBar from "./homePageComponents/SelectedIngredientsBar";
import RecentSearches from "./homePageComponents/RecentSearches";
import { Loading } from "./component/Loading.jsx";

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

  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(true);

  const [ingredientsPerRow, setIngredientsPerRow] = useState(0);
  const [showFullList, setShowFullList] = useState(true);

  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateIngredientsPerRow = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setIngredientsPerRow(6);
      } else if (width >= 1024) {
        setIngredientsPerRow(4);
      } else if (width >= 768) {
        setIngredientsPerRow(3);
      } else {
        setIngredientsPerRow(2);
      }
    };

    updateIngredientsPerRow();
    window.addEventListener("resize", updateIngredientsPerRow);
    return () => window.removeEventListener("resize", updateIngredientsPerRow);
  }, []);
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
    setIsLoading(true);
    const fakeApiResponse = {
      name: "Vegetarian Lasagna",
      time_consuming: "30 mins",
      image: "/public/example-image-recipe.png",
      difficulty: "Easy",
    };
    setRecipes([fakeApiResponse]);
    setShowRecipeDetails(true);
    setShowRecentSearches(false);
    setShowFullList(false);


    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    if (loadMoreCount < 2) {
      const moreRecipes = [
        {
          name: "Vegan Curry",
          time_consuming: "45 mins",
          image: "/public/example-img-ingredient.png",
          difficulty: "Medium",
        },
      ];
      setRecipes((recipes) => [...recipes, ...moreRecipes]);
      setLoadMoreCount(loadMoreCount + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center mb-4">Pantry</h1>
      <p className="text-center mb-4">
        You have added {selectedIngredients.length} ingredient
        {selectedIngredients.length !== 1 ? "s" : ""}
      </p>

      {/* Ingredient grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${
          showFullList ? "h-auto" : "max-h-[10rem] overflow-hidden"
        }`}
      >
        {ingredientList
          .slice(0, showFullList ? ingredientList.length : ingredientsPerRow)
          .map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              name={ingredient.name}
              onSelectIngredient={handleSelectIngredient}
              image={`/basic-ingredient-images/${ingredient.name}.png`}
            />
          ))}
      </div>

      {/* Selected ingredients bar */}
      <SelectedIngredientsBar
        ingredients={selectedIngredients}
        onRemoveIngredient={handleRemoveIngredient}
        onSearch={handleSearch}
        onIngredientSearchChange={handleIngredientSearchChange}
        searchValue={searchValue}
      />

            
      {isLoading && <Loading />}

      {/* Recipe card */}
      {showRecipeDetails && (
        <div className="relative">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
          {loadMoreCount < 2 && (
            <button
              onClick={handleLoadMore}
              className="absolute right-0 bottom-0 mr-4  text-green-dark hover:bg-green-light font-semibold py-2 px-4 rounded"
            >
              Load More
            </button>
          )}
        </div>
      )}

      {/* Recent searches */}
      {showRecentSearches && (
        <RecentSearches
          searches={mockRecentSearches}
          onSearchClick={handleRecentSearchClick}
        />
      )}
    </div>
  );
}

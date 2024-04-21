import React, { useState, useEffect } from "react";

import Ingredient from "./homePageComponents/Ingredient";
import RecipeCard from "./homePageComponents/RecipeCard";
import SelectedIngredientsBar from "./homePageComponents/SelectedIngredientsBar";
import RecentSearches from "./homePageComponents/RecentSearches";
import { Loading } from "./component/Loading.jsx";
import ErrorBanner from "./homePageComponents/ErrorBanner.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

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

  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.some((item) => item.id === ingredient.id)) {
        return prev;
      }
      return [...prev, ingredient];
    });
  };

  const handleRemoveIngredient = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientName)
    );
  };

  // Function to call the API and get the recipe
  const handleSearch = async () => {
    setErrorMessage("");
    setIsLoading(true);

    // const userId = getUserId();
    const userId = 1;

    try {
      const requestBody = {
        ingredients: selectedIngredients,
        user_id: userId,
      };
      console.log("requestBody", requestBody);
      const response = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const responseFormat = {
        name: data.recipe.recipe_name,
        time_consuming: data.recipe.cooking_time,
        image: API_BASE_URL + data.image_path,
        difficulty: data.recipe.difficulty
      };
      setRecipes([responseFormat]);
      setShowRecipeDetails(true);
      setShowRecentSearches(false);
      setShowFullList(false);
    } catch (error) {
      setErrorMessage("Something went wrong, but no worries—let's try again!");
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
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
              ingredient={ingredient}
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
        isLoading={isLoading}
      />
      {/* Error message */}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      {/* Loading spinner */}
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
              className="absolute right-0 bottom-[-2.5rem] mr-4  text-green-dark font-semibold py-2 px-4 rounded"
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

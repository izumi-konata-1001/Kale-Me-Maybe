import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import RecipeList from "./discoverPageComponents/recipeContainerComponents/RecipeList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const BrowsingHistory = () => {
  const { userId, authToken } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrowsingHistory = async () => {
      if (authToken) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/browsingHistory?userId=${userId}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (!response.ok) throw new Error("Failed to fetch browsing history");

          const data = await response.json();
          if (data && data.recipes) setRecipes(data.recipes);
        } catch (error) {
          console.error("Error fetching browsing history:", error);
          setError(error.message);
        }
      } else {
        const browsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];
        const recipeIdArray = browsingHistory.map(item => item.id);

        try {
          const response = await fetch(`${API_BASE_URL}/api/browsingHistory`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeIds: recipeIdArray }),
          });

          if (!response.ok) throw new Error("Failed to fetch recipes");

          const data = await response.json();
          console.log(data.recipes);
          if (data && data.recipes) setRecipes(data.recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setError(error.message);
        }
      }
    };

    fetchBrowsingHistory();
  }, [authToken, userId]);

  const clearBrowsingHistory = () => {
    localStorage.removeItem('browsingHistory');
    alert('Browsing history cleared.');
    setRecipes([]);
  };

  return (
    <div>
      {!authToken && (
        <button onClick={clearBrowsingHistory} className="bg-red-500 text-white px-4 py-2 rounded">
          Clear Browsing History
        </button>
      )}
      <RecipeList recipes={recipes} />
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default BrowsingHistory;
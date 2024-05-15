import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import RecipeList from "./discoverPageComponents/recipeContainerComponents/RecipeList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const BrowsingHistory = () => {
  const { userId, authToken } = useContext(AuthContext);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrowsingHistory = async () => {
      try {
        let response;
        if (!authToken) {
          // Get browsingHistory from localStorage
          const storedBrowsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];
          const recipeIds = storedBrowsingHistory.map(item => item.id)

          console.log("recipe ids: " + recipeIds);
          // Send POST request to /api/history
          response = await fetch(`${API_BASE_URL}/api/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recipeIds })
          });
        } else {
          console.log("has auth");
          // Send POST request to /api/history with userId
          response = await fetch(`${API_BASE_URL}/api/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ userId })
          });
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        if (data && Array.isArray(data.recipes)) {
          console.log('Successfully fetched browsing history:', data);
          setBrowsingHistory(data.recipes);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching browsing history:', error);
        setError(error.message || 'Error fetching browsing history');
      }
    };

    fetchBrowsingHistory();
  }, [authToken, userId]);

  const clearBrowsingHistory = () => {
    localStorage.removeItem('browsingHistory');
    alert('Browsing history cleared.');
    setBrowsingHistory([]);
    window.location.reload();
  };

  return (
    <div className="recipes-scrollable w-full">
      <div className="flex flex-col items-center justify-center pb-2">
        <h1 className="title">Browsing History</h1>
        <h3 className="text-1xl font-mono pt-2 pb-3 dark:text-white">
          10 most recent historical records
        </h3>
        {!authToken && (
          <div className="pb-5">
            <button onClick={clearBrowsingHistory} className="bg-green-dark text-white px-4 py-2 rounded">
              Clear Browsing History
            </button>
          </div>
        )}
        <div className="flex flex-col w-full items-center pb-10 justify-center">
          <RecipeList recipes={browsingHistory} />
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BrowsingHistory;

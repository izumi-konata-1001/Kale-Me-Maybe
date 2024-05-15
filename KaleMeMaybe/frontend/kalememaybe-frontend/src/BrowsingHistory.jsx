import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import RecipeList from "./discoverPageComponents/recipeContainerComponents/RecipeList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const BrowsingHistory = () => {
  const { userId, authToken } = useContext(AuthContext);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authToken) {
      // 从 localStorage 中获取 browsingHistory
      const storedBrowsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];
      
      var recipeIds = [];
      recipeIds = storedBrowsingHistory.map(item => item.id);

      console.log("recipe ids: " + recipeIds);
      // 发送 POST 请求到 /api/history
      fetch(`${API_BASE_URL}/api/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeIds: recipeIds })
      })
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.recipes)) {
          console.log('Successfully sent browsing history to the server:', data);
          setBrowsingHistory(data.recipes);
        } else {
          console.error('Unexpected response format:', data);
          setError('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Error sending browsing history to the server:', error);
        setError('Error sending browsing history to the server');
      });
    } else {
      console.log("has auth");
    }
  }, [authToken]);

  const clearBrowsingHistory = () => {
    localStorage.removeItem('browsingHistory');
    alert('Browsing history cleared.');
    setBrowsingHistory([]);
    window.location.reload();
  };

  return (
  <div className="recipes-scrollable w-full">
    <div className="flex flex-col items-center justify-center pb-2">
      <h1 className="title">Browsing Historty</h1>
      <h3 className="text-1xl font-mono pt-2 pb-3 dark:text-white">
        10 most recent historical records
      </h3>
      <div className="pb-5">
        <button onClick={clearBrowsingHistory} className="bg-green-dark text-white px-4 py-2 rounded">
          Clear Browsing History
        </button>
      </div>
      <div className="flex flex-col w-full items-center pb-10 justify-center">
      <RecipeList recipes={browsingHistory} />
      {error && <div>Error: {error}</div>}
      </div>
    </div>
  </div>
  );
};

export default BrowsingHistory;

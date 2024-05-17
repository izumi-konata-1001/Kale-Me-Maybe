import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import RecipeList from "./discoverPageComponents/recipeContainerComponents/RecipeList";
import ToastMessage from "./component/ToastMessage"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const BrowsingHistory = () => {
  const { userId, authToken } = useContext(AuthContext);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [toast, setToast] = useState({ msg: "", flag: "" });

  useEffect(() => {
    const fetchBrowsingHistory = async () => {
      try {
        let response;
        if (!authToken) {
          // Get browsingHistory from localStorage
          const storedBrowsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];
          const recipeIds = storedBrowsingHistory.map(item => item.id);

          // Send POST request to /api/history
          response = await fetch(`${API_BASE_URL}/api/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ recipeIds })
          });
        } else {
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

  const clearBrowsingHistory = async () => {
    try {
      if (!authToken) {
        localStorage.removeItem('browsingHistory');
        setBrowsingHistory([]);
        setToast({ msg: 'Successfully deleted browsing history!', flag: 'success' });
      } else {
        const response = await fetch(`${API_BASE_URL}/api/deleteAllHistory`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ userId })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        setBrowsingHistory([]);
        setToast({ msg: 'Successfully deleted browsing history!', flag: 'success' });
      }
      window.location.reload();
    } catch (error) {
      console.error('Error clearing browsing history:', error);
      setError(error.message || 'Error clearing browsing history');
      setToast({ msg: error.message || 'Error clearing browsing history', flag: 'error' });
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const buttonStyle = `
    px-4 py-2 rounded-full border-2 border-green-dark transition-colors duration-100
    bg-green-dark text-white
    hover:bg-white hover:text-green-dark
  `;

  // Get the recipes to display for the current page
  const displayedRecipes = browsingHistory.slice(0, currentPage * itemsPerPage);

  return (
    <div className="recipes-scrollable w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="title">Browsing History</h1>
        {browsingHistory.length > 0 ? (
          <>
            <h3 className="text-1xl font-mono pt-2 pb-3 dark:text-white">
              Your most recent historical records
            </h3>
            <div className="pb-5">
              <button onClick={clearBrowsingHistory} className={buttonStyle}>
                Clear Browsing History
              </button>
            </div>
          </>
        ) : (
          <h3 className="text-1xl font-mono pt-2 pb-3 dark:text-white">
            You have no historical record
          </h3>
        )}
        
        <div className="flex flex-col w-full items-center pb-10 justify-center">
          <RecipeList recipes={displayedRecipes} />
          {error && <div>Error: {error}</div>}
          {browsingHistory.length > displayedRecipes.length && (
            <button onClick={handleLoadMore} className="text-1xl font-mono text-green-dark pt-6 hover:text-lime-800 transition-colors duration-100 cursor-pointer">
              Load more...
            </button>
          )}
        </div>
      </div>
      {toast.msg && <ToastMessage msg={toast.msg} flag={toast.flag} />}
    </div>
  );
};

export default BrowsingHistory;
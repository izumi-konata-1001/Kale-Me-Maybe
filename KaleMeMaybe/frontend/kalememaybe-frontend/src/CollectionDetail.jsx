import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeGrid from "./discoverPageComponents/recipeContainerComponents/RecipeGrid";
import ConfirmDeleteModal from "./component/ConfirmDeleteModal";
import RenameCollectionModal from "./component/RenameCollectionModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function CollectionDetail() {
  const { userid, id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [collectionName, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [isWarningOpen, setWarningOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const navigate = useNavigate();

  const handleToggleBatchManage = () => {
    setShowCheckboxes(prev => {
        if (prev) {
            setSelectedRecipes([]);
        }
        return !prev;
    });
};


  const handleToggleSelect = (recipeId) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleWarningOpen = () => {
    setWarningOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const handleWarningClose = () => {
    setWarningOpen(false);
    document.body.classList.remove("body-no-scroll");
  };

  const handleRenameOpen = () => {
    setRenameOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const handleRenameClose = () => {
    setRenameOpen(false);
    document.body.classList.remove("body-no-scroll");
  };

  // delete this collection
  const handleDeleteCollection = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collection/${userid}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        handleWarningClose();
        backToFavorites();
      } else {
        setFailMsg(data.message);
      }
    } catch (error) {
      console.error("Network error or server is unreachable: ", error);
      setFailMsg("Network error or server is unreachable.");
    }
  };

  // batch delete recipes
  const handleBatchDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collection/${userid}/${id}/batch`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeIds: selectedRecipes }),
        }
      );

      if (response.ok) {
        setRecipes(
          recipes.filter((recipe) => !selectedRecipes.includes(recipe.id))
        );
        setSelectedRecipes([]);
      } else {
        const data = await response.json();
        setFailMsg(data.message);
      }
    } catch (error) {
      console.error("Network error or server is unreachable: ", error);
      setFailMsg("Network error or server is unreachable.");
    }
  };

  const backToFavorites = () => {
    navigate(`/favorites`);
  };

  // retrive recipes in this collection
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collection/${userid}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes);
        setName(data.name);

        if (data.message) {
          setMsg(data.message);
        }
      }
    } catch (error) {
      console.error("Error in fetching favorites: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-2/3 mb-10 absolute left-1/2 transform -translate-x-1/2">
      <div className="pb-10 recipes-scrollable max-h-screen overflow-y-auto w-full">
        <div className="flex justify-center items-center pb-2">
          <h2 className="title">{collectionName}</h2>
        </div>

        {/* buttons */}
        <div className="flex flex-col xs:flex-row justify-between w-full">
          {/* back to favorites */}
          <div>
            <svg
              onClick={backToFavorites}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-green-dark cursor-pointer"
              height="50"
              width="50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm212.65-91.36a16 16 0 0 1 .09 22.63L208.42 240H342a16 16 0 0 1 0 32H208.42l52.32 52.73A16 16 0 1 1 238 347.27l-79.39-80a16 16 0 0 1 0-22.54l79.39-80a16 16 0 0 1 22.65-.09z"></path>
            </svg>
          </div>

          <div className="flex flex-col xs:flex-row justify-end space-x-2">
            {/* button group for managing functions*/}
            {selectedRecipes.length > 0 && showCheckboxes && (
              <button
                onClick={handleBatchDelete}
                type="button"
                className="bg-green-dark text-white font-bold py-1 px-3 rounded-[30%]"
              >
                Delete Selected
              </button>
            )}

            <div className="inline-flex rounded-md">
              <button
                onClick={handleToggleBatchManage}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-green-dark focus:z-10 focus:ring-2 focus:ring-green-dark focus:text-green-dark dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-green-dark dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-green-dark"
              >
                {showCheckboxes ? "Close Batch Manage" : "Batch Manage"}
              </button>
              <button
                onClick={handleRenameOpen}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-green-dark focus:z-10 focus:ring-2 focus:ring-green-dark focus:text-green-dark dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-green-dark dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-green-dark"
              >
                Rename
              </button>
              <button
                onClick={handleWarningOpen}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-green-dark focus:z-10 focus:ring-2 focus:ring-green-dark focus:text-green-dark dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-green-dark dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-green-dark"
              >
                Delete Collection
              </button>
            </div>
          </div>
        </div>

        {/* recipes */}
        {msg ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600 text-xl">{msg}</p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col w-full items-center justify-center">
            <RecipeGrid
              recipes={recipes}
              onToggleSelect={handleToggleSelect}
              selectedRecipes={selectedRecipes}
              showCheckboxes={showCheckboxes}
            />
          </div>
        )}
      </div>

      {/* modal for deleting collecrions */}
      {isWarningOpen && (
        <ConfirmDeleteModal
          onClose={handleWarningClose}
          onDelete={handleDeleteCollection}
          failMsg={failMsg}
        />
      )}

      {/* modal for renaming collections */}
      {isRenameOpen && (
        <RenameCollectionModal
          onClose={handleRenameClose}
          onRename={(newName) => setName(newName)}
        />
      )}
    </div>
  );
}

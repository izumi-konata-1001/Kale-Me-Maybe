/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import NewCollectionModal from "./NewCollectionModal.jsx";
import ToastMessage from "./ToastMessage.jsx";
import useStore from "../store/store.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const RecipeFavouriteIcon = ({ recipeId, isFavorited }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [isFavoritedState, setIsFavorited] = useState(isFavorited);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [flag, setFlag] = useState("");
  const favorites = useStore((state) => state.favorites);
  const setFavorites = useStore((state) => state.setFavorites);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetchCollections(); // Fetch collections on component mount or when isFavorited changes
  }, []);

  const toggleHeart = () => {
    if (isFavoritedState) {
      removeRecipeFromFavourites(recipeId);
    } else {
      toggleModal();
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: "GET",
        headers: {
          userid: userId,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error fetching collections: ", error);
    }
  };

  const addToCollection = async (collectionId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collection/${userId}/${collectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId: recipeId }),
        }
      );

      if (response.ok) {
        setIsFavorited(true);
        setShowModal(false);

        setShowToast(true);
        setToastMessage("Added to the collection.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setShowToast(true);
      setFlag("error");
      setToastMessage("Fail to collect. Please try again.");
    }
  };

  const removeRecipeFromFavourites = async (recipeId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/discover/remove-favourite`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, recipeId }),
        }
      );
      if (response.ok) {
        setIsFavorited(false);
        setShowToast(true);
        setToastMessage("Removed.");
      }
    } catch (error) {
      console.error("Error removing recipe from favourites:", error);
      setShowToast(true);
      setFlag("error");
      setToastMessage("Error occurred. Please try again.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNewCollection = () => {
    setShowNewCollectionModal(true);
  };

  const closeNewCollectionModal = () => {
    setShowNewCollectionModal(false);
  };

  return (
    <div className="flex justify-end m-4">
      {showToast && <ToastMessage msg={toastMessage} flag={flag} />}

      <svg
        onClick={toggleHeart}
        className="w-6 h-6 text-green-dark cursor-pointer hover:fill-current duration-100"
        viewBox="0 0 20 20"
        fill={isFavoritedState ? "currentColor" : "none"}
        style={{ stroke: "currentColor", strokeWidth: "2" }}
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656L10 17.5l-6.828-6.828a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>

      {showModal && (
        <SimpleModal
          onClose={toggleModal}
          onNewCollection={handleNewCollection}
          collections={favorites}
          addToCollection={addToCollection}
        />
      )}
      {showNewCollectionModal && (
        <NewCollectionModal
          onClose={closeNewCollectionModal}
          onCollectionAdded={fetchCollections}
        />
      )}
    </div>
  );
};

export default RecipeFavouriteIcon;

const SimpleModal = ({
  onClose,
  onNewCollection,
  collections,
  userId,
  addToCollection,
}) => {
  const {darkMode} = useContext(AuthContext);
  return (
    <div className={darkMode?"dark":""}>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-40"
      ></div>
      <div className={`rounded-lg shadow-lg w-1/5 h-1/2 min-w-64 min-h-[200px] flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-4 dark:bg-gray-800`}>
        <div className="flex justify-between items-center">
          <label className="block text-xl font-bold text-green-dark">
            Add to Favorites
          </label>
          <button onClick={onClose} className="text-red-500">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-auto hide-scrollbar">
          <ul className={"text-center flex flex-col text-black dark:text-white"}>
            {collections.map((collection, index) => (
              <li key={index} className="py-2">
                <button
                  className="block px-4 text-sm hover:bg-green-light dark:hover:bg-green-dark w-full h-12 rounded"
                  onClick={() => addToCollection(collection.id)}
                >
                  {collection.CollectionName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onNewCollection}
          className="mt-4 bg-green-dark hover:bg-green-light text-white hover:text-green-dark font-bold py-2 px-4 rounded"
        >
          Create a new list
        </button>
      </div>
    </div>
  );
};

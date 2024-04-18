import Collection from "./component/Collection";
import { useEffect, useState } from "react";
import NewCollectionModal from "./component/NewCollectionModal";

export default function Favorites() {
  const [favorites, setFav] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const closeModal = async (success,newCollection) => {
    setModalOpen(false);
    document.body.classList.remove("body-no-scroll");
    if(success && newCollection) {
      setFav([...favorites, newCollection]);
    }
  }

  const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/favorites", {
            method: "GET",
            headers: {
              //change it into tokens later
              userid: "1",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setFav(data);
          }
        } catch (error) {
          console.error("Error in fetching favorites: ", error);
        }
      };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col w-2/3 mb-10 absolute top-[20%] left-1/2 transform -translate-x-1/2"
    >
      <div className="mb-10">
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-5xl font-bold">Favorites</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <a onClick={handleOpenModal} className="inline-block">
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                    fill="#97C279"
                  ></path>{" "}
                </g>
              </svg>
            </a>
            <label className="text-gray-600 ml-4">
              Add a new board...
            </label>
          </div>
          <svg
            fill="#97C279"
            viewBox="0 0 56 56"
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 16.5390 25.3984 C 16.5390 20.4531 20.5936 16.3984 25.5624 16.3984 C 30.5077 16.3984 34.5624 20.4531 34.5624 25.3984 C 34.5624 27.3437 33.9530 29.1250 32.8983 30.5781 L 38.7577 36.4375 C 39.0858 36.7656 39.2968 37.2109 39.2968 37.6563 C 39.2968 38.6406 38.6171 39.3203 37.7030 39.3203 C 37.1640 39.3203 36.7187 39.1563 36.2733 38.7109 L 30.4843 32.9219 C 29.0780 33.8594 27.3671 34.4219 25.5624 34.4219 C 20.5936 34.4219 16.5390 30.3672 16.5390 25.3984 Z M 19.1405 25.3984 C 19.1405 28.9141 22.0468 31.8203 25.5624 31.8203 C 29.0312 31.8203 31.9374 28.9141 31.9374 25.3984 C 31.9374 21.9297 29.0312 19.0234 25.5624 19.0234 C 22.0468 19.0234 19.1405 21.9297 19.1405 25.3984 Z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mx-4">
        {/* collection list */}
        {favorites.map((favorite, index) => (
          <div key={index}>
            <Collection
              collectionName={favorite.CollectionName}
              recipeCount={favorite.RecipeCount}
              imgPath={favorite.LatestRecipeImagePath}
            />
          </div>
        ))}
      </div>
      {modalOpen && <NewCollectionModal onClose={() => closeModal()} />}
    </div>
  );
}

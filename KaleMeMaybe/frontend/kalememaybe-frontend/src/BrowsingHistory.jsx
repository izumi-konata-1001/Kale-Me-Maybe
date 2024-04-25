import { useContext, useEffect, useState } from "react";
import RecipeFavouriteIcon from "./component/RecipeFavouriteIcon.jsx";
import { AuthContext } from "./contexts/AuthProvider.jsx";
import RecipeScoreIcon from "./component/RecipeScoreIcon.jsx";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function BrowsingHistory() {
  const { authToken, userId } = useContext(AuthContext);
  const [broData, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const run = async () => {
      if (!authToken) {
        const response1 = await fetch(`${API_BASE_URL}/api/updatebro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(await response1.json());
      } else {
        const response = await fetch(
          `${API_BASE_URL}/api/browsing?id=${userId}`
        );
        setData(await response.json());
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (authToken) {
      fetch(`${API_BASE_URL}/api/clearRecipeIds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Recipe IDs cleared on server.");
          }
        })
        .catch((error) => console.error("Failed to clear Recipe IDs:", error));
    }
  }, [authToken]);

  return (
    <div className="flex flex-col items-center BrowsingHistory">
      <h1 className="title">Browsing History</h1>
      <div className="mt-10 mb-10 search-div">
        <input
          type="text"
          name="search"
          className="border border-gray-300 border-r-0 h-10 bg-gray-100 rounded-tl-md rounded-bl-md search"
          placeholder="  Search for your specify recipes..."
          style={{ width: "600px" }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="mt-4 bg-green-dark text-white px-4 py-2 rounded-md rounded-tl-none rounded-bl-none btt"
          onClick={() => {
            setFilter(searchValue);
            console.log(filterValue);
          }}
        >
          Search
        </button>
      </div>
      {broData.length ? (
        <div
          className="flex flex-col items-center overflow-y-auto cardset"
          style={{ maxHeight: "500px" }}
        >
          {broData
            .filter((item) =>
              item?.name?.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <div
                className="relative border border-gray-200 w-2/3 p-3 px-4 mb-6 shadow card"
                key={item.recipe_id}
                onClick={() => navigate(`/recipe/${item.recipe_id}`)}
              >
                <div className="absolute w-44 h-44 border-2 border-green-dark rounded-lg mr-12 mt-5 mb-5 ml-5 overflow-hidden picture">
                  <img src={`${API_BASE_URL}/${item.image_path}`}></img>
                </div>
                <div className="ml-60 relative content">
                  <h3 className="text-xl font-mono font-bold pt-1 pb-1 mt-5 mb-1.5 subtitle">
                    {item.name}
                  </h3>
                  <div className="flex flex-row mt-3 mb-3 ml-0 mr-0 fouricons">
                    <p className="rounded-xl px-3 py-1 text-sm font-semibold bg-green-light text-green-dark shadow mr-5 h-7.5 firsttwo">
                      {item.time_consuming}
                    </p>
                    <p className="rounded-xl px-3 py-1 text-sm font-semibold bg-green-light text-green-dark shadow mr-5 h-7.5 firsttwo">
                      {item.difficulty}
                    </p>
                    <div className="mr-5 h-2.5">
                      <RecipeScoreIcon recipeId={item.recipe_id} />
                    </div>
                    <div className="favIcon -mt-3.5 mr-5 h-2.5">
                      {authToken && <RecipeFavouriteIcon />}
                    </div>
                  </div>
                  <p className="text-base leading-normal text-gray-600 break-words w-87 h-24 overflow-hidden text-ellipsis des">
                    {item.method}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No browsing history ever</p>
      )}
    </div>
  );
}

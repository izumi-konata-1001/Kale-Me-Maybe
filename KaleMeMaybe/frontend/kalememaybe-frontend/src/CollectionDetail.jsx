import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeGrid from "./discoverPageComponents/recipeContainerComponents/RecipeGrid";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function CollectionDetail() {
  const { userid, id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [collectionName, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const backToFavorites = () => {
    navigate(`/favorites`);
  };

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
    <div className="flex flex-col w-2/3 mb-10 absolute top-[20%] left-1/2 transform -translate-x-1/2">
      <div className="mb-10">
        <div className="flex justify-center items-center mb-10">
          <h2 className="title">{collectionName}</h2>
        </div>

        {/* buttons */}
        <div className="flex justify-between">
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

          <button className="bg-green-dark text-white font-bold py-1 px-3 rounded-[30px]">
            Manage
          </button>
        </div>

        {/* recipes */}
        {msg ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600 text-xl">{msg}</p>
          </div>
        ) : (
          <div className="mt-8">
            <RecipeGrid recipes={recipes} />
          </div>
        )}
      </div>
    </div>
  );
}

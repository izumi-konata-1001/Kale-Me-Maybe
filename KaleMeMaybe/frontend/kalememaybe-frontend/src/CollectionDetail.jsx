import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeGrid from "./discoverPageComponents/recipeContainerComponents/RecipeGrid";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function CollectionDetail() {
  const { userid, id } = useParams();
  const [recipes, setRecipes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collection/${userid}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("get data: ", data)
        setRecipes(data);
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
          <h2 className="title"></h2>
        </div>

        {/* buttons */}
        <div className="flex justify-between"></div>

        {/* recipes */}
        {recipes.message ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600 text-xl">{recipes.message}</p>
          </div>
        ) : (
        <RecipeGrid recipes={recipes}/>
        )}
      </div>
    </div>
  );
}

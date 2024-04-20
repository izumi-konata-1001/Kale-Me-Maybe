import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./store/store";
import RecipesContainer from "./discoverPageComponents/RecipesContainer";

export default function SearchFavorites() {
  const searchResults = useStore((state) => state.searchResults);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchResults.length === 0) {
      navigate("/favorites");
    }
  }, [searchResults, navigate]);

  return (
    <div className="flex flex-col w-2/3 mb-10 absolute top-[20%] left-1/2 transform -translate-x-1/2">
      <div className="mb-10">
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-5xl font-bold">Search Result</h2>
        </div>
        {searchResults.message ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-600 text-xl">{searchResults.message}</p>
          </div>
        ) : (
          <RecipesContainer recipes={searchResults} />
        )}
      </div>
    </div>
  );
}

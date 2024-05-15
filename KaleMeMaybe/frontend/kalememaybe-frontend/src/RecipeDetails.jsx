import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import StarRating from "./component/StarRating.jsx";
import { Loading } from "./component/Loading.jsx";
import RecipeFavouriteIcon from "./component/RecipeFavouriteIcon.jsx";
import { AuthContext } from "./contexts/AuthProvider.jsx";
import RecipeScoreIcon from "./component/RecipeScoreIcon.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
export default function RecipeDetails() {
    const { authToken, userId } = useContext(AuthContext);
    const hasFetchedRef = useRef(false);
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    function addBrowsingHistory(recipeId, timestamp, userId) {
        fetch('/api/addBrowsingHistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            userId: userId,
            recipeId: recipeId,
            timestamp: timestamp
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Successfully added browsing history to the server:', data);
        })
        .catch(error => {
          console.error('Error adding browsing history to the server:', error);
        });
      }
      
    useEffect(() => {
        if (hasFetchedRef.current) return;
        mianFunction()
        }, []);

        const mianFunction = () => {
            const url = `${API_BASE_URL}/api/recipe/${id}`;

            fetch(url, {
                headers: {
                    userid: userId,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.recipe) {
                        setRecipe(data.recipe);
                    }
                    if (data && typeof data.isFavorited !== 'undefined') {
                        setIsFavorited(data.isFavorited);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching recipe:", error);
                    setError(error.message);
                });

                const formatDate = date => {
                    const pad = num => (num < 10 ? '0' + num : num);
                    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
                  };
                  const newTimestamp = formatDate(new Date());
                
                if (!authToken) {
                    const browsingHistory = JSON.parse(localStorage.getItem('browsingHistory')) || [];
                    const exists = browsingHistory.some(item => item.id === id);
                    if (exists) {
                        const updatedBrowsingHistory = browsingHistory.map(item => {
                          if (item.id === id) {
                            return { ...item, timestamp: newTimestamp };
                          }
                          return item;
                        });
                        localStorage.setItem('browsingHistory', JSON.stringify(updatedBrowsingHistory));
                        console.log(`ID ${id} timestamp updated in the browsing history.`);
                      } 
                    else {
                        const newEntry = {
                          id: id,
                          timestamp: newTimestamp
                        };
                        browsingHistory.push(newEntry);
                        localStorage.setItem('browsingHistory', JSON.stringify(browsingHistory));
                        console.log(`ID ${id} added to the browsing history.`);
                      }
                    console.log(`Updated browsing history:`, JSON.parse(localStorage.getItem('browsingHistory')));}
                else{
                    addBrowsingHistory(id, newTimestamp, userId);
                }
                hasFetchedRef.current = true; 
        }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <Loading />;
    }

    const ingredients = recipe.ingredient_details;
    const ingredientsArray = ingredients
        .replace(/[.]/g, "")
        .split("\n")
        .map((item) => item.trim());

    const method = recipe.method;
    const methodArray = method.split("\n").map((item) => item.trim());
    const imagePath = `${API_BASE_URL}/${recipe.image_path}`;

    return (
        <div className={"pb-10"}>
            <div className="md:relative sm:grid grid-cols-4 items-center w-full">
                <div className="col-span-1 flex justify-start pl-4">
                    <BackButton />
                </div>
                <h1 className="col-span-2 title text-center">
                    {recipe.name}
                </h1>
                <div className="col-span-1"></div>
            </div>

            <div className="flex justify-center gap-5 items-center">
        <span className="bg-green-light font-semibold text-green-dark px-2 py-1 rounded shadow">
          {recipe.time_consuming}
        </span>
                <span className="bg-green-light font-semibold text-green-dark px-2 py-1 rounded shadow">
          {recipe.difficulty}
        </span>

                <RecipeScoreIcon recipeId={id} />
                {authToken && <RecipeFavouriteIcon recipeId={id} isFavorited={isFavorited}/>}
            </div>
            <div className={"flex justify-center p-5"}>
                <img
                    src={imagePath || "/pasta.png"}
                    alt={recipe.name}
                    className="rounded-lg h-64 w-auto  dark:border-4 dark:border-green-dark"
                />
            </div>

      <div className="flex flex-col items-start md:flex-row md:justify-center">
        <div className="w-full md:w-1/3 h-auto border-r-2 border-none md:border-dotted border-green-dark p-2 overflow-y-auto max-h-96">
          <h1 className="text-xl font-bold text-lime-900 dark:text-green-light">Ingredients</h1>
          <ul className="list-disc list-inside dark:text-white">
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3 p-2 md:pl-5 overflow-y-auto max-h-96">
          <h1 className="text-xl font-bold text-lime-900 dark:text-green-light">Method</h1>
          <ol className="list-decimal list-inside dark:text-white">
            {methodArray.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ol>
        </div>
      </div>

            {authToken && (
                <div className={"flex flex-col items-center justify-center p-5"}>
                    <StarRating
                        userId={userId}
                        recipeId={id}
                        authToken={authToken}
                        onSetRating={handleRatingSubmit}
                    />
                    <p className={"text-green-dark dark:text-white"}>How do you like this recipe?</p>
                </div>
            )}
        </div>
    );
}

export function BackButton() {
    let navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <button
            onClick={handleGoBack}
            className="absolute left-0 flex justify-center items-center"
        >
            <IoArrowBackCircle size={50} className={"text-green-dark"} />
        </button>
    );
}

const handleRatingSubmit = (rating, userId, id, authToken) => {
    console.log(
        "Rating:",
        rating,
        "UserID:",
        userId,
        "RecipeID:",
        id,
        "AuthToken:",
        authToken
    );
    fetch(`${API_BASE_URL}/api/score`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Assuming you use Bearer tokens
        },
        body: JSON.stringify({
            userId: userId,
            recipeId: id,
            score: rating,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update rating");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Rating updated successfully", data);
        })
        .catch((error) => {
            console.error("Error updating rating:", error);
        });
};

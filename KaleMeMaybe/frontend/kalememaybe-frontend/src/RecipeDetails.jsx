import { useContext, useEffect, useState } from "react";
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

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
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
    }, [id]);

    //Send data to update the browsing history table - Zishuai
    useEffect(() => {
        const dataToSend = userId
            ? { userId, recipeId: id, hasUserId: true }
            : { recipeId: id, hasUserId: false };

        fetch(`${API_BASE_URL}/api/updatebro/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update user and recipe info");
                }
                return response.json();
            })
            .then((data) => {
                console.log("User and recipe info updated successfully", data);
            })
            .catch((error) => {
                console.error("Error updating user and recipe info:", error);
            });
    }, [id, userId]);

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

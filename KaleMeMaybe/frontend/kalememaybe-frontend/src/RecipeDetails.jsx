import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {IoArrowBackCircle} from "react-icons/io5";
import StarRating from "./component/StarRating.jsx";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/recipe/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(setRecipe)
            .catch(error => {
                console.error('Error fetching recipe:', error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const ingredients =recipe.ingredient_details;
    const ingredientsArray = ingredients
        .replace(/[.]/g, '')
        .split(',')
        .map(item => item.trim());


    return (
        <div className={"pb-10"}>
            <div className="relative flex justify-center items-center w-full">
                <BackButton />
                <h1 className="text-5xl font-bold p-5 text-lime-900">{recipe.name}</h1>
            </div>


            <div className="flex justify-center gap-5">
                <span
                    className="bg-green-light font-semibold text-green-dark px-2 py-1 rounded shadow">{recipe.time_consuming}
                </span>
                <span
                    className="bg-green-light font-semibold text-green-dark px-2 py-1 rounded shadow">{recipe.difficulty}
                </span>
            </div>
            <div className={"flex justify-center pt-5"}>
                <StarRating />
            </div>
            <div className={"flex justify-center p-5"}>
                <img src='/pasta.png' alt={recipe.name} className="rounded-lg h-64 w-auto"/>
            </div>

            <div className="flex justify-center">
                <div className={"w-1/3 h-auto border-r-2 border-dotted border-green-dark p-2"}>
                    <h1 className={"text-xl font-bold text-lime-900"}>Ingredients</h1>
                    <ul className={"list-disc list-inside"}>
                        {ingredientsArray.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                    </ul>
                </div>

                <div className={"w-1/3 p-2 pl-5"}>
                    <h1 className={"text-xl font-bold text-lime-900"}>Method</h1>
                    <p>{recipe.method}</p>
                </div>
            </div>
        </div>
    );
}


function BackButton() {
    let navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <button onClick={handleGoBack} className="absolute left-0 flex justify-center items-center">
            <IoArrowBackCircle size={50} className={"text-green-dark"}/>
        </button>
    );
}

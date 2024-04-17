import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    return (
        <div className="">
            <h1 className={"text-3xl text-center font-bold p-5 text-lime-900"}>{recipe.name}</h1>
            <div className="recipe-metadata">
                <span className="duration">{recipe.time_consuming}</span>
                <span className="difficulty">{recipe.difficulty}</span>
            </div>
            <img src={recipe.image_path} alt={recipe.name} className="recipe-image" />
            <div className="ingredients">
                <h2>Ingredients</h2>
            </div>
            <div className="method">
                <h2>Method</h2>
            </div>
        </div>
    );
}

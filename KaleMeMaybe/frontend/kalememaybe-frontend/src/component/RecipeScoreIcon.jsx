import{ useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const RecipeScoreIcon = ({ recipeId,averageScore,onSetAverageScore }) => {

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/score/average/${recipeId}`)
            .then(response => response.json())
            .then(data => {
                if (data.averageScore !== undefined) {
                    onSetAverageScore(data.averageScore);
                } else {
                    onSetAverageScore('n/a');
                }
            })
            .catch(() => onSetAverageScore('Error'));
    }, [recipeId]);

    return(
        <div className="flex items-center justify-center">
            <svg className="text-green-dark w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.396-.12.812-.12 1.208 0l2.022 5.953h6.26c.685 0 1.024.842.52 1.28l-5.073 3.666 1.906 5.833c.197.605-.49 1.095-.978.719l-4.913-3.55-4.913 3.55c-.487.376-1.175-.114-.978-.719l1.906-5.833-5.073-3.666c-.504-.438-.165-1.28.52-1.28h6.26l2.023-5.953z" />
            </svg>
            <span className="text-green-dark">{averageScore}</span>
        </div>
    );
};

export default RecipeScoreIcon;

// RecipesContainer.js
import React, { useState } from 'react';
import RecipeOptions from './recipeContainerComponents/RecipeOptions';
import RecipeGrid from './recipeContainerComponents/RecipeGrid';
import RecipeList from './recipeContainerComponents/RecipeList';

const RecipesContainer = ({ recipes, onSortChange}) => {
    const [activeView, setActiveView] = useState('grid');

    return (
        <div className="flex flex-col items-center justify-center">
            <RecipeOptions activeView={activeView} setActiveView={setActiveView} onSortChange={onSortChange} />
            {activeView === 'grid' ? <RecipeGrid recipes={recipes} /> : <RecipeList recipes={recipes} />}
        </div>
    );
};

export default RecipesContainer;
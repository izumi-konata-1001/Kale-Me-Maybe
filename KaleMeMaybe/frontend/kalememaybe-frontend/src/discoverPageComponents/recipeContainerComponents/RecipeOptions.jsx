import React from 'react';
import SortOptions from './recipeOpationComponents/SortOptions';
import ViewOptions from './recipeOpationComponents/ViewOptions';

const RecipeOptions = ({ activeView, setActiveView, onSortChange }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <SortOptions onSortChange={onSortChange} />
            <ViewOptions activeView={activeView} setActiveView={setActiveView} />
        </div>
    );
};

export default RecipeOptions;
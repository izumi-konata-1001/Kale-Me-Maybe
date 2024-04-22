import React from 'react';
import SortOptions from './recipeOpationComponents/SortOptions';
import ViewOptions from './recipeOpationComponents/ViewOptions';

const RecipeOptions = ({ activeView, setActiveView, onSortChange }) => {
    return (
        <div className="flex flex-col w-full s:flex-row s:items-center s:justify-center p-3">
            <div className="s:mr-5">
            <SortOptions onSortChange={onSortChange} />
            </div>
            <div className="flex w-full mt-5 justify-center s:w-auto s:mt-0">
                <ViewOptions activeView={activeView} setActiveView={setActiveView} />
            </div>
        </div>
    );
};

export default RecipeOptions;
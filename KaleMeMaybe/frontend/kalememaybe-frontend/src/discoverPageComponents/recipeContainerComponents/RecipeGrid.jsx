import RecipeCard from './recipeGridComponents/RecipeCard';

const RecipeGrid = ({recipes}) => {
    return (
        <div className="flex flex-wrap justify-center gap-5">
            {recipes.map((recipe, index) => (
                <div
                    key={index}
                    className="flex flex-col overflow-hidden"
                    style={{ width: 'calc(33.3333% - 16px)' }} // Assuming gap-5 is roughly equivalent to 16px
                >
                    <RecipeCard recipe={recipe}/>
                </div>
            ))}
        </div>
    );

}

export default RecipeGrid;
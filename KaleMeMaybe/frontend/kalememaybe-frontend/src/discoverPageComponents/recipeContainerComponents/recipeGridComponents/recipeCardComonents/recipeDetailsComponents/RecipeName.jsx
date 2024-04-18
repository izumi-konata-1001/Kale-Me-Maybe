const RecipeName = ({recipe}) => {
    return(
        <div>
            <h2 className="text-lg font-semibold mb-1 self-start">{recipe.name}</h2>
        </div>
    );
}
export default RecipeName;
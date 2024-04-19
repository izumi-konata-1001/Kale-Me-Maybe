const RecipeDescription = ({ recipe }) => {

    const truncateText = (text) => {
        const wordArray = text.split(' '); 
        if (wordArray.length > 50) {
            return wordArray.slice(0, 50).join(' ') + '...';  
        }
        return text; 
    };

    return (
        <div>
            <p>{truncateText(recipe.method)}</p>
        </div>
    );
}

export default RecipeDescription;

import { Link } from 'react-router-dom';
const RecipeDescription = ({ recipe }) => {

    const truncateText = (text) => {
        const wordArray = text.split(' '); 
        if (wordArray.length > 50) {
            return wordArray.slice(0, 50).join(' ') + '...';  
        }
        return text; 
    };

    return (
        <div className="pt-1">
            <p className="flex justify-end">
                <Link to={`/recipe/${recipe.id}`} className="text-dark hover:text-green-dark transition-colors duration-100 cursor-pointer">
                    {truncateText(recipe.method)}
                </Link>
            </p>
        </div>
    );
}

export default RecipeDescription;
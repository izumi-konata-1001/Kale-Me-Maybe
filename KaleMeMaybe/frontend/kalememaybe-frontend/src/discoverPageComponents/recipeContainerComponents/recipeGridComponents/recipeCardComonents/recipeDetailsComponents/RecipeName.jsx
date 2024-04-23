import { Link } from 'react-router-dom';

const RecipeName = ({recipe}) => {
    return(
        <div>
            <h2 className="text-lg font-semibold mb-1 self-start">
                <Link to={`/recipe/${recipe.id}`} className="text-dark hover:text-green-dark transition-colors duration-100 cursor-pointer">
                    {recipe.name}
                </Link>
            </h2>
        </div>
    );
}
export default RecipeName;
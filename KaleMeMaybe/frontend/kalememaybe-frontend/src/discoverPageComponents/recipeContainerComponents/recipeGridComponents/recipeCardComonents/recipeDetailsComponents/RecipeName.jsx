import { Link } from "react-router-dom";

const RecipeName = ({ recipe }) => {
  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...'; // Subtract 3 to account for the length of the ellipsis
    }
    return text;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1 self-start">
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-dark hover:text-green-dark transition-colors duration-100 cursor-pointer"
        >
          {truncateText(recipe.name, 50)}
        </Link>
      </h2>
    </div>
  );
};
export default RecipeName;
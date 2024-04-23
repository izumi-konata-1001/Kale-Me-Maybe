// 收藏按钮组件
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const TestFavouriteIcon = ({ recipe }) => {
    const { userId } = useContext(AuthContext);
    const [like, setLike] = useState(recipe.favouriteState);  

    const toggleLike = () => {
        const newLikeState = !like; 
        setLike(newLikeState);

        if (newLikeState === false) {
            removeRecipeFromFavourites(recipe.id);
        }
    };

    const removeRecipeFromFavourites = async (recipeId) => {
        try {
            await fetch('http://localhost:3000/api/discover/remove-favourite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, recipeId }),
            });
        } catch (error) {
            console.error('Error removing recipe from favourites:', error);
        }
    };

    return (
        <div className="flex justify-end">
            <svg
                onClick={toggleLike}
                className={`w-6 h-6 cursor-pointer ${like ? 'text-green-dark fill-current' : 'text-green-dark'}`}
                viewBox="0 0 20 20"
                fill={like ? "currentColor" : "none"} 
                style={{
                    stroke: 'currentColor', 
                    strokeWidth: '2'
                }}
            >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656L10 17.5l-6.828-6.828a4 4 0 010-5.656z" />
            </svg>
        </div>
    );
}

export default TestFavouriteIcon;

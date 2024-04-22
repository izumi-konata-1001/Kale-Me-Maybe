import RecipeFavouriteIcon from "../../../../../../component/RecipeFavouriteIcon.jsx";
import { useContext } from 'react';
import { AuthContext } from '../../../../../../contexts/AuthProvider.jsx';

const RecipeInfoRight = ({recipe}) => {
    const { userId } = useContext(AuthContext);

    return(
        <div className="flex justify-end items-center pr-1">
            {userId && <RecipeFavouriteIcon recipe={recipe}/>}
        </div>
    );
}

export default RecipeInfoRight;
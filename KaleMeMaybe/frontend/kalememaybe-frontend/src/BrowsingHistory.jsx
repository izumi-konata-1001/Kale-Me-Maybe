import { useContext, useEffect, useState } from "react";
import "./BrowsingHistory.css"
import { FaRegHeart } from "react-icons/fa";
import RecipeFavouriteIcon from "./component/RecipeFavouriteIcon.jsx";
import {AuthContext} from "./contexts/AuthProvider.jsx";
import RecipeScoreIcon from "./component/RecipeScoreIcon.jsx";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function BrowsingHistory(){
    const { authToken,userId } = useContext(AuthContext);
    const [broData, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilter] = useState("");
    useEffect(() => {
        const run = async () => {
            console.log("123");
            const response = await fetch(`${API_BASE_URL}/api/browsing`,{userId});
            setData(await response.json());
        }
        run()
    },[])

    return <div className="BrowsingHistory">
        <h1 className="text-6xl font-mono pt-2 pb-1">Browsing History</h1>
        {/* <h1>Browsing History</h1> */}
        <div className="search-div">
            <input type="text" name="search" className="search" placeholder="  Search your generated recipes..." onChange={e=>setSearchValue(e.target.value)}/>
            <button className="mt-4 bg-green-dark text-white px-4 py-2 rounded-md btt" onClick={()=>{setFilter(searchValue);console.log(filterValue)}} >Search</button>
        </div>
        <div className="cardset">
            {broData.filter(item=>item?.name?.includes(filterValue)).map((item)=> 
            <div className="card" key={item.recipe_id}>
                <div className="picture"><img src={item.image_path}></img></div>
                <div className="content">
                    <h3 className="subtitle text-xl font-mono font-bold pt-1 pb-1 ">{item.name}</h3>
                    <div className="fouricons">
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">{item.time_consuming}</p>
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">{item.difficulty}</p>
                        <RecipeScoreIcon recipeId={item.recipe_id} />
                        {authToken && <RecipeFavouriteIcon />}
                        {/* <div>4.1</div> */}
                        {/* <FaRegHeart className="heart-icon" size={20} /> */}
                        {/* <FaHeart className="heart-icon" size={20} /> */}
                    </div>
                    <p className="text-base leading-normal text-gray-600 des">{item.method}</p>
                </div>
            </div>
            )}
        </div>
    </div>;
}

const handleRatingSubmit = (rating,userId,id,authToken) => {
    console.log("Rating:", rating, "UserID:", userId, "RecipeID:", id, "AuthToken:", authToken);
    fetch(`${API_BASE_URL}/api/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // Assuming you use Bearer tokens
        },
        body: JSON.stringify({
            userId: userId,
            recipeId: id,
            score: rating
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update rating');
            }
            return response.json();
        })
        .then(data => {
            console.log('Rating updated successfully', data);
        })
        .catch(error => {
            console.error('Error updating rating:', error);
        });
};
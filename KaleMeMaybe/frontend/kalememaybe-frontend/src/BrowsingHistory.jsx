import "./BrowsingHistory.css"
import { FaRegHeart } from "react-icons/fa";
export default function BrowsingHistory(){
    return <div className="BrowsingHistory">
        <h1 class="text-6xl font-mono pt-2 pb-1">Browsing History</h1>
        {/* <h1>Browsing History</h1> */}
        <div className="search-div">
            <input type="text" name="search" className="search" placeholder="  Search your generated recipes..."/>
            <button className="mt-4 bg-green-dark text-white px-4 py-2 rounded-md btt" >Search</button>
        </div>
        <div className="cardset">
            <div className="card">
                <div className="picture"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/500px-Googleplex_HQ_%28cropped%29.jpg"></img></div>
                <div className="content">
                    <h3 className="subtitle text-xl font-mono font-bold pt-1 pb-1 ">Vegetarian bolognese</h3>
                    <div className="fouricons">
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">25 min</p>
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">easy</p>
                        <div>4.1</div>
                        <FaRegHeart className="heart-icon" size={20} />
                        {/* <FaHeart className="heart-icon" size={20} /> */}
                    </div>
                    <p className="text-base leading-normal text-gray-600 des">On a hectic weeknight, nothing beats the convenience of a one-pot meal. And luckily, with the help of the Instant Pot, even sophisticated dishes like homemade bolognese can be simplified into effortless, single-dish meals—provided you have the right recipe.</p>
                </div>
            </div>
            <div className="card">
                <div className="picture"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/500px-Googleplex_HQ_%28cropped%29.jpg"></img></div>
                <div className="content">
                    <h3 className="subtitle text-xl font-mono font-bold pt-1 pb-1 ">Vegetarian bolognese</h3>
                    <div className="fouricons">
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">25 min</p>
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">easy</p>
                        <div>4.1</div>
                        <FaRegHeart className="heart-icon" size={20} />
                        {/* <FaHeart className="heart-icon" size={20} /> */}
                    </div>
                    <p className="text-base leading-normal text-gray-600 des">On a hectic weeknight, nothing beats the convenience of a one-pot meal. And luckily, with the help of the Instant Pot, even sophisticated dishes like homemade bolognese can be simplified into effortless, single-dish meals—provided you have the right recipe.</p>
                </div>
            </div>
            <div className="card">
                <div className="picture"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/500px-Googleplex_HQ_%28cropped%29.jpg"></img></div>
                <div className="content">
                    <h3 className="subtitle text-xl font-mono font-bold pt-1 pb-1 ">Vegetarian bolognese</h3>
                    <div className="fouricons">
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">25 min</p>
                        <p className="rounded-xl px-3 py-1 text-sm font-medium firsttwo">easy</p>
                        <div>4.1</div>
                        <FaRegHeart className="heart-icon" size={20} />
                        {/* <FaHeart className="heart-icon" size={20} /> */}
                    </div>
                    <p className="text-base leading-normal text-gray-600 des">On a hectic weeknight, nothing beats the convenience of a one-pot meal. And luckily, with the help of the Instant Pot, even sophisticated dishes like homemade bolognese can be simplified into effortless, single-dish meals—provided you have the right recipe.</p>
                </div>
            </div>
        </div>
    </div>;
}
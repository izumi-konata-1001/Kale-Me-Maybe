import ReactDOM from 'react-dom';
import { useState } from 'react';
import useStore from '../store/store';

//maybe use PropTypes later
// eslint-disable-next-line react/prop-types
export default function NewCollectionModal ({ onClose }) {
    const updateFavorites = useStore(state => state.updateFavorites);
    const [inputValue, setValue] = useState("");
    const [showErrorMsg, setShow] = useState(false);

    const handleInputChange = (event) => {
        setValue(event.target.value);
        if (showErrorMsg) {
            setShow(false)
        }
    }

    const createNewCollection = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/favorites",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: 1, name: inputValue }),
            })

            if(response.ok) {
                const newCollection = await response.json();
                console.log("new collection: ",newCollection)
                updateFavorites(newCollection)
                onClose(true);
            } else {
                setShow(true);
            }
        } catch (error) {
            console.error("Error occurred while creating a collection: ", error)
            onClose(false);
            setShow(true);
        }
    }

    return ReactDOM.createPortal(
        <>
            <div onClick={() => onClose(false)} className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-40"></div>
            <div className="rounded-lg shadow-lg w-1/5 h-1/2 min-w-64 min-h-[200px] flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-4">
                <div className="flex justify-between items-center mb-8">
                    <label></label>
                    <svg onClick={() => onClose(false)} className="cursor-pointer" width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_SM"> <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#97C279" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                </div>
                <div className="flex flex-col items-center p-4 gap-6 h-full">
                    <label className="block text-2xl font-bold">New collection</label>
                    <input
                        type="text"
                        placeholder="New collection name"
                        className="border-gray-300 border rounded p-2 w-full mb-4 placeholder-gray-500 placeholder-opacity-50"
                        value={inputValue}
                        onChange={handleInputChange}
                    ></input>
                    <button type="submit" onClick={createNewCollection} className="w-[140px] h-[40px] bg-green-dark text-white font-bold rounded">Create</button>
                    {showErrorMsg && <label className="text-gray-500 text-sm">Operation failed, please try again</label>}
                </div>
            </div>
        </>,
        document.body
    )
}
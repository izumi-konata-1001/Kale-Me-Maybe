import { useState } from 'react';
import NewCollectionModal from "./NewCollectionModal.jsx";


const RecipeFavouriteIcon = ({recipe}) => {
    const [showModal, setShowModal] = useState(false);
    const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleNewCollection = () => {
        setShowNewCollectionModal(true);
    };

    const closeNewCollectionModal = () => {
        setShowNewCollectionModal(false);
    };

    return (
        <div className="flex justify-end m-4">
            <svg
                onClick={toggleModal}
                className={`w-6 h-6 cursor-pointer ${showModal ? 'text-green-dark fill-current' : 'text-green-dark'}`}
                viewBox="0 0 20 20"
                fill={showModal ? "currentColor" : "none"}
                style={{ stroke: 'currentColor', strokeWidth: '2' }}
            >
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656L10 17.5l-6.828-6.828a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {showModal && <SimpleModal onClose={toggleModal} onNewCollection={handleNewCollection} />}
            {showNewCollectionModal && <NewCollectionModal onClose={closeNewCollectionModal} />}
        </div>
    );
};

export default RecipeFavouriteIcon;


const SimpleModal = ({ onClose, onNewCollection }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg text-green-dark">Add to Favorites</h2>
                    <button onClick={onClose} className="text-red-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className={"text-center text-lime-900 p-2"}>Your collections</h1>
                <ul className={"text-center flex flex-col"}>
                    <button className="block py-2 px-4 text-sm hover:bg-green-light">Collection name 1</button>
                    <button className="block py-2 px-4 text-sm hover:bg-green-light">Collection name 2</button>
                    <button className="block py-2 px-4 text-sm hover:bg-green-light">Collection name 3</button>
                </ul>
                <button onClick={onNewCollection} className="mt-4 bg-green-dark hover:bg-green-light text-white hover:text-green-dark font-bold py-2 px-4 rounded">
                    Create a new list
                </button>
            </div>
        </div>
    );
};
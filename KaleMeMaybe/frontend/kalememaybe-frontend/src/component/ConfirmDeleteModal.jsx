import ReactDOM from "react-dom";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider.jsx";

export default function ConfirmDeleteModal({ onClose, onDelete, failMsg }) {
  const { darkMode } = useContext(AuthContext);


  return ReactDOM.createPortal(
    <div className={darkMode?'dark':''}>
      <div
        onClick={() => onClose(false)}
        className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-40"
      ></div>

      <div className={`z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-8 dark:bg-gray-800`}>
        <div>
          <h4 className="text-lg font-semibold text-green-dark">
            Delete the Collection
          </h4>
        </div>
        <div className="mt-4">
          {failMsg ? (
            <p className="text-red-600">Fail to delete. Please try again.</p>
          ) : (
            <p className="text-gray-600 text-green-dark">
              Are you sure you want to delete this collection? This action
              cannont be undone.
            </p>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

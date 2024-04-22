import ReactDOM from "react-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useStore from "../store/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function SearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchResults = useStore((state) => state.setSearchResults);
  const navigate = useNavigate();

  const { userId } = useContext(AuthContext)

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchFavorites = async (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/favorites/search?searchTerm=${encodeURIComponent(
            searchTerm
          )}`,
          {
            method: "GET",
            headers: {
              userid: userId,
            },
          }
        );
        const data = await response.json();
        console.log("after search: ", data);
        setSearchResults(data);
        onClose(true);
        navigate(
          `/favorites/search?searchTerm=${encodeURIComponent(searchTerm)}`
        );
      } catch (error) {
        console.error("Error occurred while searching in collections: ", error);
      }
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        onClick={() => onClose(false)}
        className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100 z-40"
      ></div>

      <form
        onSubmit={searchFavorites}
        className="
              z-50 w-full max-w-lg fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 transition-all opacity-100 scale-100
            "
      >
        <div
          className="overflow-hidden rounded-lg bg-white shadow-md"
          //  id="headlessui-dialog-panel-287" data-headlessui-state="open"
        >
          <div className="relative">
            <input
              className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
              placeholder="Find favorites..."
              aria-label="Search components"
              id="headlessui-combobox-input-288"
              role="combobox"
              type="text"
              aria-expanded="false"
              aria-autocomplete="list"
              data-headlessui-state=""
              value={searchTerm}
              onChange={handleInputChange}
              tabIndex="0"
            />
            <svg
              className="fill-green-dark cursor-pointer absolute right-4 top-4 h-6 w-6 fill-slate-400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
            </svg>
          </div>
        </div>
      </form>
    </>,
    document.body
  );
}

import React from "react";

const RecentSearches = ({ searches, onSearchClick, isLoading }) => {
  return (
    <div className="my-4">
      <div className="text-gray-500 mb-2">Recent Searches:</div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-gray-100 border border-green-light text-gray-600 text-sm rounded-full cursor-pointer hover:border-green-dark"
            onClick={() => !isLoading && onSearchClick(search)}
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
          >
            {search}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;

import { useState } from "react";

const ViewToggle = () => {
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="flex space-x-2">
      <button
        className={`p-2 ${
          activeView === "grid" ? "bg-green-500" : "bg-green-200"
        }`}
        onClick={() => setActiveView("grid")}
      >
        {/* Icon for grid view */}
      </button>
      <button
        className={`p-2 ${
          activeView === "list" ? "bg-green-500" : "bg-green-200"
        }`}
        onClick={() => setActiveView("list")}
      >
        {/* Icon for list view */}
      </button>
    </div>
  );
};

export default ViewToggle;

const ViewButton = ({ icon, active, onClick }) => {
  // Active and inactive styles
  const activeStyle =
    "rounded-xl bg-green-dark text-white hover:bg-green-dark hover:text-white";
  const inactiveStyle =
    "bg-white text-green-dark border rounded-xl border-green-dark hover:bg-green-light hover:border-green-light  hover:text-white";

  // Size style
  const sizeStyle = "w-11 h-11"; // Sets the width and height to 2.75rem

  // Add transition styles to the base styles
  const transitionStyle = "transition-colors duration-100";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 border-2  border-green-dark rounded ${transitionStyle} ${sizeStyle} ${
        active ? activeStyle : inactiveStyle
      }`}
    >
      {icon}
    </button>
  );
};

export default ViewButton;

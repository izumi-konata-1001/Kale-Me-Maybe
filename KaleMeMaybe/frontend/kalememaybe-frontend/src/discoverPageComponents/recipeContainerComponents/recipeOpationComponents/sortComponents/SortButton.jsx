const SortButton = ({ label, isActive, onClick }) => {
    const buttonStyle = `px-4 py-2 rounded-full ${isActive ? 'font-sans bg-green-dark text-white' : 'font-sans border border-green-dark bg-white text-black'}`;
  
    return (
      <button className={buttonStyle} onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default SortButton;
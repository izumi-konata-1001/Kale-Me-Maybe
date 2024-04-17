const SortButton = ({ label, isActive, onClick }) => {
    const buttonStyle = `px-4 py-2 rounded-lg ${isActive ? 'bg-green-dark text-white' : 'bg-green-light text-green-dark'}`;
  
    return (
      <button className={buttonStyle} onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default SortButton;
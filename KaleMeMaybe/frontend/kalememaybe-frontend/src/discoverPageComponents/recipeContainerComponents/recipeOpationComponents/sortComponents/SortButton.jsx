const SortButton = ({ label, isActive, onClick }) => {
  const buttonStyle = `px-4 py-2 rounded-full border border-green-dark border-2 transition-colors duration-100 ${isActive ? 'font-sans bg-green-dark text-white hover:bg-white hover:text-green-dark' : 'font-sans border-green-dark bg-white text-black hover:bg-green-dark hover:text-white'}`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default SortButton;

const ViewButton = ({ icon, active, onClick }) => {
    const activeStyle = 'rounded-xl bg-green-dark text-white';
    const inactiveStyle = 'bg-white text-green-dark border rounded-xl border-green-dark';
    
    // Assuming you want the buttons to be 10rem by 10rem as an example. Adjust the size as needed.
    const sizeStyle = 'w-11 h-11'; // This sets both the width and height to 10rem
  
    return (
      <button
        onClick={onClick}
        className={`${sizeStyle} ${active ? activeStyle : inactiveStyle}`}
      >
        {icon}
      </button>
    );
  };
  
  export default ViewButton;
  

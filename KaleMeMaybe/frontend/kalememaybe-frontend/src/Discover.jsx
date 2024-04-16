import { useEffect, useState } from 'react';

const Discover = () => {
  const [items, setItems] = useState([]);
  const [like, setLike] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/discover')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching data: ', err));
  }, []);


  const toggleLike = like => {
    if (like == 0)
    {
      setLike(1);
    }
    else{
      setLike(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-6xl font-mono pt-2 pb-5">Pantry</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden"
            style={{ width: 'calc(33.3333% - 16px)' }} // Assuming gap-5 is roughly equivalent to 16px
          >
            <div className="bg-green-dark p-1 rounded-lg shadow-lg">
              <img
                src={item.image_path}
                alt={item.name}
                className="object-cover rounded-lg" // The image will be fully round
                style={{ width: '100%', height: 'auto' }} // Ensuring the image scales correctly
              />
            </div>
            <div className="p-1 flex-1 flex flex-col justify-between"> 
              <h2 className="text-lg font-semibold mb-1 self-start">{item.name}</h2>
              <div className="flex items-center justify-between text-sm">
                <div className="flex space-x-1">
                  <span className="px-3 py-1 rounded-full bg-green-light text-green-dark">
                    {item.time_consuming}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-light text-green-dark">
                    {item.difficulty}
                  </span>
                  <span className="flex items-center">
                    <svg className="text-yellow-400 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.396-.12.812-.12 1.208 0l2.022 5.953h6.26c.685 0 1.024.842.52 1.28l-5.073 3.666 1.906 5.833c.197.605-.49 1.095-.978.719l-4.913-3.55-4.913 3.55c-.487.376-1.175-.114-.978-.719l1.906-5.833-5.073-3.666c-.504-.438-.165-1.28.52-1.28h6.26l2.023-5.953z" />
                    </svg>
                    <span className="text-gray-600">5</span>
                  </span>
                </div>
                <div className="flex justify-end p-1">
              <svg
                onClick={() => toggleLike(like)}
                className={`w-6 h-6 cursor-pointer ${like === 1 ? 'text-green-dark' : 'text-gray-300'}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656L10 17.5l-6.828-6.828a4 4 0 010-5.656z" />
              </svg>
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-1xl font-sans self-end text-green-dark">learn more</p>
    </div>
  );
};

export default Discover;

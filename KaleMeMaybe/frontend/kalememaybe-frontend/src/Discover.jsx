import { useEffect, useState, useContext } from 'react';
import RecipesContainer from './discoverPageComponents/RecipesContainer';
import { AuthContext } from './contexts/AuthProvider';
import { Loading } from "./component/Loading.jsx";

const Discover = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [sort, setSort] = useState(''); 
  const [direction, setDirection] = useState(''); 

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    let url = 'http://localhost:3000/api/discover';
    let queryParams = [];
  
    if (sort && direction) {
      queryParams.push(`sort=${sort}&direction=${direction}`);
    }
  
    if (userId) {
      queryParams.push(`userId=${userId}`);
    }
  
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(err => console.error('Error fetching sorted data:', err));
  }, [sort, direction, userId]);  

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const sortMethod = (sortOption, newDirection) => {
    setSort(sortOption);
    setDirection(newDirection);
    console.log(`sort: ${sortOption}, direction: ${newDirection}`);
  };

  if (!recipes)
  {
    return <Loading />
  }

  return (
    <div className="recipes-scrollable max-h-screen overflow-y-auto w-full">

      <div className="flex flex-col items-center justify-center pb-2">
        <h1 className="title">Pantry</h1>
        <h3 className="text-1xl font-mono pt-2 pb-3">Explore the Green Gastronomy</h3>
        <RecipesContainer recipes={recipes.slice(0, visibleCount)} onSortChange={sortMethod} />
        {visibleCount >= recipes.length ? (
          <p className="text-1xl font-mono text-green-dark pt-6 pb-2">No more recipes</p>
        ) : (
          <button 
            className="text-1xl font-mono text-green-dark pt-6 pb-2  hover:text-lime-800 transition-colors duration-100 cursor-pointer"
            onClick={handleLoadMore}
          >
            Load more<br/>...
          </button>
          )}
      </div>
    </div>
  );
};

export default Discover;
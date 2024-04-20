import { useEffect, useState } from 'react';
import RecipesContainer from './discoverPageComponents/RecipesContainer';

const Discover = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sort, setSort] = useState(''); 
  const [direction, setDirection] = useState(''); 

 /* useEffect(() => {
    fetch('http://localhost:3000/api/discover')
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(err => console.error('Error fetching data: ', err));
  }, []);

  useEffect(() => {
    if (sort && direction) {
      fetch(`http://localhost:3000/api/discover?sort=${sort}&direction=${direction}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
        setVisibleCount(6);
      })
      .catch(err => console.error('Error fetching sorted data:', err));
    }
}, [sort, direction]);*/
useEffect(() => {
  let url = 'http://localhost:3000/api/discover';
  if (sort && direction) {
      url += `?sort=${sort}&direction=${direction}`;
  }

  fetch(url)
  .then(response => response.json())
  .then(data => {
      setRecipes(data.recipes);
      setVisibleCount(6);
  })
  .catch(err => console.error('Error fetching sorted data:', err));
}, [sort, direction]);



  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const sortMethod = (sortOption, newDirection) => {
    setSort(sortOption);
    setDirection(newDirection);
    console.log(`sort: ${sortOption}, direction: ${newDirection}`);
};

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-6xl font-mono pt-2 pb-1">Pantry</h1>
      <h3 className="text-1xl font-mono pt-2 pb-5">Explore the Green Gastronomy</h3>
      <RecipesContainer recipes={recipes.slice(0, visibleCount)} onSortChange={sortMethod} />
      {visibleCount >= recipes.length ? (
        <p className="text-1xl font-mono text-green-dark pt-6 pb-2">No more recipes</p>
      ) : (
        <button 
          className="text-1xl font-mono text-green-dark pt-6 pb-2 cursor-pointer"
          onClick={handleLoadMore}
        >
          Load more...
        </button>
        )}
    </div>
  );
};

export default Discover;
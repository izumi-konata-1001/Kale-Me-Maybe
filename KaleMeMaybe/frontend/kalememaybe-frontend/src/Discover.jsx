import { useEffect, useState } from 'react';
import RecipeArea from './discoverPageComponents/RecipesContainer';

const Discover = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/discover')
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(err => console.error('Error fetching data: ', err));
  }, []);


  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-6xl font-mono pt-2 pb-1">Pantry</h1>
      <h3 className="text-1xl font-mono pt-2 pb-5">Explore the Green Gastronomy</h3>
      <RecipeArea recipes={recipes}/>
    </div>
  );
};

export default Discover;
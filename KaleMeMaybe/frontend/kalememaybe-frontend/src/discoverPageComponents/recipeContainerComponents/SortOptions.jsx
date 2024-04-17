import { useState } from 'react';
import SortButton from './sortComponents/SortButton';

const SortOptions = () => {
    const [activeSort, setActiveSort] = useState('difficulties');
  
    return (
      <div className="flex justify-center space-x-2">
        <span>Sort by:</span>
        {['difficulties', 'rate', 'time', 'popularity'].map((sortOption) => (
          <SortButton
            key={sortOption}
            label={sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
            isActive={activeSort === sortOption}
            onClick={() => setActiveSort(sortOption)}
          />
        ))}
      </div>
    );
  };

export default SortOptions;
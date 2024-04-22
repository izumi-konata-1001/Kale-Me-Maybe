import { useState } from 'react';
import SortButton from './sortComponents/SortButton';

// SortOptions.js

const SortOptions = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState({ field: '', direction: '' });

  const handleButtonClick = (sortOption) => {
      setActiveSort(current => {
          let newDirection = '';
          if (current.field === sortOption) {
              newDirection = current.direction === 'asc' ? 'desc' : (current.direction === 'desc' ? '' : 'asc');
          } else {
              newDirection = 'asc';
          }
          onSortChange(sortOption, newDirection); 
          return { field: sortOption, direction: newDirection };
      });
  };

  const getSortLabel = (sortOption) => {
      const baseLabel = sortOption.charAt(0).toUpperCase() + sortOption.slice(1);
      if (activeSort.field === sortOption && activeSort.direction === 'asc') {
          return `${baseLabel} △`;
      } else if (activeSort.field === sortOption && activeSort.direction === 'desc') {
          return `${baseLabel} ▽`;
      }
      return baseLabel;
  };

  return (
    <div className="flex s:flex-row justify-center flex-col items-center">
        <span className="font-sans mb-2 s:mb-0 s:mr-3">Sort by:</span>
            <div className="grid grid-cols-2 gap-3 w-full pr-0 s:flex s:space-x-1 s:justify-center s:w-auto">
                {['difficulty', 'rate', 'time', 'popularity'].map((sortOption) => (
                    <SortButton
                        key={sortOption}
                        label={getSortLabel(sortOption)}
                        isActive={activeSort.field === sortOption && activeSort.direction !== ''}
                        onClick={() => handleButtonClick(sortOption)}
                    />
                ))}
            </div>
    </div>
  );
};

export default SortOptions;

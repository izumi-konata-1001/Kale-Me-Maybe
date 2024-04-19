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
          console.log("Sort Option:", sortOption);  // 正确打印变量名
          console.log("New Direction:", newDirection); 
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
      <div className="flex justify-center space-x-3 items-center">
          <span className="font-sans">Sort by:</span>
          {['difficulty', 'rate', 'time', 'popularity'].map((sortOption) => (
              <SortButton
                  key={sortOption}
                  label={getSortLabel(sortOption)}
                  isActive={activeSort.field === sortOption && activeSort.direction !== ''}
                  onClick={() => handleButtonClick(sortOption)}
              />
          ))}
      </div>
  );
};

export default SortOptions;

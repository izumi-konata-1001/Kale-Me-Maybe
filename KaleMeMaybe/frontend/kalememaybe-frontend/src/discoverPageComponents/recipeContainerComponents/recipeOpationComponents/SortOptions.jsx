import { useState } from 'react';
import SortButton from './sortComponents/SortButton';

const SortOptions = () => {
  // State now includes both the field and the direction of sorting
  const [activeSort, setActiveSort] = useState({ field: '', direction: '' });

  const handleButtonClick = (sortOption) => {
    setActiveSort(current => {
      if (current.field === sortOption) {
        // If the field is already active, then toggle the direction
        if (current.direction === '') return { field: sortOption, direction: 'asc' };
        if (current.direction === 'asc') return { field: sortOption, direction: 'desc' };
        return { field: '', direction: '' }; // Reset if 'desc'
      } else {
        // If it's a new field, start with 'asc'
        return { field: sortOption, direction: 'asc' };
      }
    });
  };

  const getSortLabel = (sortOption) => {
    if (activeSort.field !== sortOption) return sortOption.charAt(0).toUpperCase() + sortOption.slice(1);
    if (activeSort.direction === 'asc') return sortOption.charAt(0).toUpperCase() + sortOption.slice(1) + " △";
    if (activeSort.direction === 'desc') return sortOption.charAt(0).toUpperCase() + sortOption.slice(1) + " ▽";
    return sortOption.charAt(0).toUpperCase() + sortOption.slice(1);
  };

  return (
    <div className="flex justify-center space-x-3 items-center">
      <span className="font-sans">Sort by:</span>
      {['difficulties', 'rate', 'time', 'popularity'].map((sortOption) => (
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

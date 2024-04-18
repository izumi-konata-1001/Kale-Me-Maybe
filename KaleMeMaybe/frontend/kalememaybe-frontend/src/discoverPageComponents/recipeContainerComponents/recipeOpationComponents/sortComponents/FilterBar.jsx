import SortOptions from '../SortOptions';
import ViewToggle from './ViewToggle';

const FilterBar = () => {
    return (
      <div className="flex justify-between items-center p-4">
        <SortOptions />
        <ViewToggle />
      </div>
    );
  };
  
  export default FilterBar;
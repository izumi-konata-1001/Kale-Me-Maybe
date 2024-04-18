// ViewOptions component
import React from 'react';
import ViewButton from './viewComponents/ViewButton';

const ViewOptions = ({ activeView, setActiveView }) => {
  return (
    <div className="flex space-x-2 ml-12">
      <ViewButton
        icon={'grid'} // Replace 'Grid' with your grid icon
        active={activeView === 'grid'}
        onClick={() => setActiveView('grid')}
      />
      <ViewButton
        icon={'list'} // Replace 'List' with your list icon
        active={activeView === 'list'}
        onClick={() => setActiveView('list')}
      />
    </div>
  );
};

export default ViewOptions;


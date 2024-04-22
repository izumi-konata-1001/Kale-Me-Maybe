// ViewOptions component
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import ViewButton from './viewComponents/ViewButton';

const ViewOptions = ({ activeView, setActiveView }) => {
  return (
    <div className="flex space-x-2 s:ml-12">
      <ViewButton 
        icon={<IoGridOutline className="text-3xl"/>}
        active={activeView === 'grid'}
        onClick={() => setActiveView('grid')}
      />
      <ViewButton
        icon={<CiBoxList className="text-3xl"/>}
        active={activeView === 'list'}
        onClick={() => setActiveView('list')}
      />
    </div>
  );
};

export default ViewOptions;


import Dropdown from '@/components/SortDropdown/Dropdown';
import { dropdownData } from '@/mockData/SortDropdownData';

function Sort() {
  return (
    <div className="sort-scroll flex overflow-x-auto p-1">
      {dropdownData.map((data) => (
        <Dropdown label={data.label} options={data.list} />
      ))}
    </div>
  );
}

export default Sort;

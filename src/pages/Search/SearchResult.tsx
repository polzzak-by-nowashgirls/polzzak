import Button from '@/components/Button/Button';
// import ListItem from '@/components/ListItem/ListItem';
import DropdownCustom from '@/components/SortDropdown/DropdownCustom';
import { useSearchStore } from '@/store/useSearchStore';

function SearchResult() {
  return (
    <div className="flex flex-col gap-4">
      <DropdownCustom />
      <section>{/* <ListItem /> */}</section>
      <Button variant={'secondary'}>더보기</Button>
    </div>
  );
}

export default SearchResult;

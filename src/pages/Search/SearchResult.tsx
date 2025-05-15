import Button from '@/components/Button/Button';
import ListItem from '@/components/ListItem/ListItem';
import DropdownCustom from '@/components/SortDropdown/DropdownCustom';
import { useSearchStore } from '@/store/useSearchStore';

function SearchResult() {
  const { searchResults } = useSearchStore();

  return (
    <main className="flex h-full w-full flex-1 flex-col gap-4 p-6">
      <div>
        <DropdownCustom />
      </div>
      {searchResults.length > 0 ? (
        <section className="flex flex-col gap-4 overflow-y-scroll">
          <ListItem data={searchResults} />
          <Button variant={'secondary'}>더보기</Button>
        </section>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </main>
  );
}

export default SearchResult;

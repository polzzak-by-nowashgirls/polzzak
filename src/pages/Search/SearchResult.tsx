import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import ListItem from '@/components/ListItem/ListItem';
import DropdownCustom from '@/components/SortDropdown/DropdownCustom';

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (!keyword) navigate('/search');
  });

  return (
    <div className="flex flex-col gap-4">
      <DropdownCustom />
      <section>
        <ListItem />
      </section>
      <Button variant={'secondary'}>더보기</Button>
    </div>
  );
}

export default SearchResult;

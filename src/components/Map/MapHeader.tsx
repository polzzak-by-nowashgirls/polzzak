import { MutableRefObject, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon, { IconId } from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { useDialogStore } from '@/store/useDialogStore';
import { LatLng } from '@/types/LatLng';

interface MapHeaderProps {
  mapRef: MutableRefObject<kakao.maps.Map | null>;
  myLocation: LatLng | null;
  isLoggedIn: boolean;
}

function MapHeader({ mapRef, myLocation, isLoggedIn }: MapHeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { closeModal } = useDialogStore();
  const [searchValue, setSearchValue] = useState('');

  const MAP_FILTER = [
    { contentTypeId: '', category: 'favorite', label: '즐겨찾기' },
    { contentTypeId: '', category: 'polzzak', label: '나의폴짝' },
    { contentTypeId: '39', category: 'food', label: '음식점' },
    { contentTypeId: '15', category: 'festival', label: '축제' },
    { contentTypeId: '12', category: 'tour', label: '관광지' },
    { contentTypeId: '28', category: 'leports', label: '레포츠' },
    { contentTypeId: '38', category: 'shopping', label: '쇼핑' },
    { contentTypeId: '32', category: 'hotels', label: '숙박' },
    { contentTypeId: '14', category: 'cultural', label: '문화시설' },
  ];

  const handleFilterClick = (category: string) => {
    const current = new URLSearchParams(searchParams);
    const isActive = searchParams.get('category') === category;

    if (isActive) {
      current.delete('category');
      closeModal();
    } else {
      current.set('category', category);
    }

    navigate({
      pathname: '/map',
      search: current.toString(),
    });
  };

  const handleLocationClick = () => {
    if (!mapRef.current || !myLocation) return;

    mapRef.current.setCenter(
      new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
    );
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const current = new URLSearchParams(searchParams);

      if (searchValue) {
        current.set('keyword', searchValue);
      } else {
        current.delete('keyword');
        closeModal();
      }
      navigate({
        pathname: '/map',
        search: current.toString(),
      });
    }
  };

  return (
    <>
      <header className="absolute top-4 right-4 left-4 z-10 m-auto flex flex-col justify-between gap-2">
        <Input
          label="검색"
          hideLabel={true}
          value={searchValue}
          onChange={onChangeSearch}
          onKeyDown={onSearchKeyDown}
          placeholder="검색어를 입력해 주세요."
          className="bg-white"
        >
          <Button variant="tertiary" size="md" className="text-gray05">
            <Icon id="search" />
          </Button>
        </Input>
      </header>

      <ul className="absolute top-[62px] right-0 left-0 z-10 m-auto flex gap-1 overflow-hidden py-2">
        {MAP_FILTER.filter(
          ({ category }) =>
            isLoggedIn || (category !== 'favorite' && category !== 'polzzak'),
        ).map(({ category, label }) => {
          const isActive = searchParams.get('category') === category;
          return (
            <li key={category} className="first-of-type:ml-4">
              <button
                className={`fs-14 text-gray07 border-gray03 flex items-center gap-1 rounded-4xl border px-3 py-1 whitespace-nowrap ${isActive ? 'bg-primary border-primary text-white' : 'bg-white'}`}
                onClick={() => handleFilterClick(category)}
              >
                <Icon
                  id={
                    (category === 'favorite'
                      ? 'favorite_off'
                      : category) as IconId
                  }
                  size={16}
                  className={`${isActive ? 'text-white' : 'text-gray05'}`}
                />
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="secondary"
        size="md"
        className="absolute top-[116px] right-4 z-10 h-10 w-10"
        onClick={handleLocationClick}
      >
        <Icon id="location" />
      </Button>
    </>
  );
}

export default MapHeader;

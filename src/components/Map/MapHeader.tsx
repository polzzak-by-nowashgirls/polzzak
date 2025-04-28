import { MutableRefObject, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { LatLng } from '@/types/LatLng';

interface MapHeaderProps {
  mapRef: MutableRefObject<kakao.maps.Map | null>;
  myLocation: LatLng | null;
  isLoggedIn: boolean;
  onCategoryBtnClick: () => void;
}
function MapHeader({
  mapRef,
  myLocation,
  isLoggedIn,
  onCategoryBtnClick,
}: MapHeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // ✅ category만 의존성으로 추출
  const category = searchParams.get('category');

  useEffect(() => {
    setActiveFilter(category);
  }, [category]);

  const handleFilterClick = (category: string) => {
    const current = new URLSearchParams(searchParams);
    const isActive = category === activeFilter;

    if (isActive) {
      setActiveFilter(null);
      current.delete('category');
    } else {
      setActiveFilter(category);
      current.set('category', category);
    }

    navigate({
      pathname: '/map',
      search: current.toString(),
    });

    if (!isActive) {
      onCategoryBtnClick();
    }
  };

  const handleLocationClick = () => {
    if (!mapRef.current || !myLocation) return;

    mapRef.current.setCenter(
      new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
    );
  };

  return (
    <>
      <header className="fixed top-4 right-4 left-4 z-10 flex flex-col justify-between gap-2">
        <Input
          label="검색"
          hideLabel={true}
          placeholder="검색어를 입력해 주세요."
          className="bg-white"
        >
          <Button variant="tertiary" size="md" className="text-gray05">
            <Icon id="search" />
          </Button>
        </Input>
      </header>

      <ul className="fixed top-[62px] right-0 left-0 z-10 flex gap-1 py-2">
        {MAP_FILTER.filter(
          ({ category }) =>
            isLoggedIn || (category !== 'favorite' && category !== 'polzzak'),
        ).map(({ category, label }) => (
          <li key={category} className="first-of-type:ml-4">
            <button
              className={`fs-14 text-gray07 border-gray07 rounded-4xl border px-3 py-1 whitespace-nowrap ${activeFilter === category ? 'bg-primary border-primary text-white' : 'bg-white'}`}
              onClick={() => handleFilterClick(category)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <Button
        variant="secondary"
        size="md"
        className="fixed top-[116px] right-4 z-10 h-10 w-10"
        onClick={handleLocationClick}
      >
        <Icon id="location" />
      </Button>
    </>
  );
}

export default MapHeader;

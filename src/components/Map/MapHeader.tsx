import { MutableRefObject, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';

type LatLng = {
  lat: number;
  lng: number;
};

interface MapHeaderProps {
  mapRef: MutableRefObject<kakao.maps.Map | null>;
  myLocation: LatLng | null;
  onFoodBtnClick: () => void;
  onFestivalBtnClick: () => void;
  onTourBtnClick: () => void;
}
function MapHeader({
  mapRef,
  myLocation,
  onFoodBtnClick,
  onFestivalBtnClick,
  onTourBtnClick,
}: MapHeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const MAP_FILTER = [
    { key: 'favorite', name: '즐겨찾기' },
    { key: 'polzzak', name: '나의폴짝' },
    { key: 'food', name: '음식점' },
    { key: 'festival', name: '축제' },
    { key: 'tour', name: '관광지' },
    { key: 'leports', name: '레포츠' },
    { key: 'shopping', name: '쇼핑' },
    { key: 'hotels', name: '숙박' },
    { key: 'cultural', name: '문화시설' },
  ];

  // key 기준으로 상태 관리
  const [activeFilterKey, setActiveFilterKey] = useState<string | null>(null);

  // URL 쿼리 파라미터와 연결
  useEffect(() => {
    const category = searchParams.get('category');
    setActiveFilterKey(category);
  }, [searchParams]);

  const handleFilterClick = (filterKey: string) => {
    const current = new URLSearchParams(searchParams);

    const isActive = filterKey === activeFilterKey;

    if (isActive) {
      setActiveFilterKey(null);
      current.delete('category');
    } else {
      setActiveFilterKey(filterKey);
      current.set('category', filterKey);
    }

    navigate({
      pathname: '/map',
      search: current.toString(),
    });

    // 콜백 실행
    if (!isActive) {
      if (filterKey === 'food') onFoodBtnClick();
      else if (filterKey === 'festival') onFestivalBtnClick();
      else if (filterKey === 'tour') onTourBtnClick();
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
        {MAP_FILTER.map(({ key, name }) => (
          <li key={key} className="first-of-type:ml-4">
            <button
              className={`fs-14 text-gray07 border-gray07 rounded-4xl border px-3 py-1 whitespace-nowrap ${activeFilterKey === key ? 'bg-primary border-primary text-white' : 'bg-white'}`}
              onClick={() => handleFilterClick(key)}
            >
              {name}
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

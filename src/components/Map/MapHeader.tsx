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
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);

  const MAP_FILTER = [
    {
      id: 1,
      name: '즐겨찾기',
      path: '/map/favorite',
    },
    {
      id: 2,
      name: '나의폴짝',
      path: '/map/polzzak',
    },
    {
      id: 3,
      name: '음식점',
      path: '/map/food',
    },
    {
      id: 4,
      name: '축제',
      path: '/map/festival',
    },
    {
      id: 5,
      name: '관광지',
      path: '/map/tour',
    },
  ];

  useEffect(() => {
    const category = searchParams.get('category');
    const filterMap: { [key: string]: number } = {
      food: 3,
      festival: 4,
      tour: 5,
    };

    setActiveFilterId(category ? (filterMap[category] ?? null) : null);
  }, [searchParams]);

  const handleFilterClick = (filterId: number, path: string | null) => {
    if (filterId === activeFilterId) {
      setActiveFilterId(null);
      if (filterId === 3) onFoodBtnClick();
      if (filterId === 4) onFestivalBtnClick();
      if (filterId === 5) onTourBtnClick();
      return;
    }

    setActiveFilterId(filterId);

    if (filterId === 3) {
      onFoodBtnClick();
    } else if (filterId === 4) {
      onFestivalBtnClick();
    } else if (filterId === 5) {
      onTourBtnClick();
    } else if (path) {
      navigate(path);
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
        {MAP_FILTER.map(({ id, name, path }) => (
          <li key={id} className="first-of-type:ml-4">
            <button
              className={`fs-14 text-gray07 border-gray07 rounded-4xl border px-3 py-1 whitespace-nowrap ${activeFilterId === id ? 'bg-primary border-primary text-white' : 'bg-white'}`}
              onClick={() => handleFilterClick(id, path)}
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

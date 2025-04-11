import { MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { useModalStore } from '@/store/useModalStore';

type LatLng = {
  lat: number;
  lng: number;
};

interface MapHeaderProps {
  mapRef: MutableRefObject<kakao.maps.Map | null>;
  myLocation: LatLng | null;
}

function MapHeader({ mapRef, myLocation }: MapHeaderProps) {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  function handleMapFilter(name?: string) {
    if (name === '즐겨찾기') {
      navigate(`/map/favorite`);
    }
    openModal('favorite');
  }

  const handleClick = () => {
    if (mapRef.current && myLocation) {
      const center = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
      mapRef.current.panTo(center);
    }
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
      <Chip mode="map_filter" hideLabel={true} onClick={handleMapFilter} />
      <Button
        variant="secondary"
        size="md"
        className="fixed top-[120px] right-4 z-10 h-10 w-10"
        onClick={handleClick}
      >
        <Icon id="location" />
      </Button>
    </>
  );
}

export default MapHeader;

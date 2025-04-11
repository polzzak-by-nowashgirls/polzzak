import { useEffect, useRef, useState } from 'react';
import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet } from 'react-router-dom';

import MapHeader from '@/components/MapHeader/MapHeader';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

type LatLng = {
  lat: number;
  lng: number;
};

function Map() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });

  // 🗺️ 지도 참조 Ref
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 🚩 내 위치 상태 저장
  const [myLocation, setMyLocation] = useState<LatLng | null>(null);

  const { isOpen } = useModalStore();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('내 위치:', latitude, longitude);
        setMyLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('😭 위치 정보를 가져올 수 없어요. : ', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  if (loading) return <div>🗺️ 지도를 불러오고 있어요!</div>;
  if (error) return <div>😭 지도를 불러오는 데 실패했어요.</div>;
  if (!myLocation) return <div>🚩 내 위치를 불러오고 있어요!</div>;

  return (
    <>
      <MapHeader mapRef={mapRef} myLocation={myLocation} />
      <MapArea
        ref={mapRef}
        center={myLocation ?? { lat: 33.55635, lng: 126.795841 }}
        style={{ width: '100%', height: '100%' }}
        className="relative"
        level={3}
      >
        {myLocation && (
          <MapMarker
            position={myLocation}
            image={{
              src: '/marker/my_location.svg',
              size: {
                width: 24,
                height: 24,
              },
              options: {
                offset: {
                  x: 12,
                  y: 12,
                },
              },
            }}
          ></MapMarker>
        )}
        <Outlet />
        {isOpen && <Modal mode="slide" type="favorite" />}
      </MapArea>
    </>
  );
}

export default Map;

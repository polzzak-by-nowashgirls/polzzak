import { useEffect, useRef, useState } from 'react';
import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet } from 'react-router-dom';

import { useGetNearbyFoodList } from '@/api/openAPI/hooks/useGetNearbyFoodList';
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

  // 🍽️ 음식점 리스트 표시 여부 상태
  const [showFoodList, setShowFoodList] = useState(false);

  // 음식점 버튼 클릭 핸들러
  const handleFoodBtnClick = () => setShowFoodList((prev) => !prev);

  // 🍽️ 주변 음식점 리스트 가져오기
  const foodList = useGetNearbyFoodList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showFoodList, // 사용자가 음식점 버튼을 클릭했을 때만 호출
  );

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
      <MapHeader
        mapRef={mapRef}
        myLocation={myLocation}
        showFoodList={showFoodList}
        onFoodBtnClick={handleFoodBtnClick}
      />
      <MapArea
        ref={mapRef}
        center={myLocation ?? { lat: 33.55635, lng: 126.795841 }}
        style={{ width: '100%', height: '100%' }}
        className="relative"
        level={3}
      >
        {/* 🚩 내 위치 마커 */}
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

        {/* 🍽️ 음식점 마커 */}
        {foodList.map((item, index) => (
          <MapMarker
            key={index}
            position={{ lat: Number(item.mapy), lng: Number(item.mapx) }}
            image={{
              src: '/marker/map_marker.svg',
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
          />
        ))}
        {showFoodList && foodList.length > 0 && (
          <ul className="fixed right-4 bottom-0 left-4 z-10 max-h-[40vh] overflow-auto rounded-lg bg-white p-4 shadow-lg">
            {foodList.map((food) => (
              <li key={food.contentid} className="mb-4">
                {food.firstimage ? (
                  <img src={food.firstimage} alt={food.title} />
                ) : (
                  <div className="flex h-[120px] w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                    이미지 없음
                  </div>
                )}
                <p className="mt-2 font-bold">{food.title}</p>
                <p className="text-sm text-gray-600">{food.addr1}</p>
                {food.tel ? (
                  <p className="text-sm text-gray-600">{food.tel}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <Outlet />
        {isOpen && <Modal mode="slide" type="favorite" />}
      </MapArea>
    </>
  );
}

export default Map;

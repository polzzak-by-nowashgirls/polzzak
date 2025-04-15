import { useEffect, useRef, useState } from 'react';
import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet } from 'react-router-dom';

import { useGetNearFestivalList } from '@/api/openAPI/hooks/map/useGetNearFestival';
import { useGetNearFoodList } from '@/api/openAPI/hooks/map/useGetNearFoodList';
import MapHeader from '@/components/Map/MapHeader';
import MapModal from '@/components/Map/MapModal';

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
  const [showFestivalList, setShowFestivalList] = useState(false);

  // 음식점 버튼 클릭 핸들러
  const handleFoodBtnClick = () => {
    setShowFoodList((prev) => !prev);
  };

  // 축제 버튼 클릭 핸들러
  const handleFestivalBtnClick = () => {
    setShowFestivalList((prev) => !prev);
  };

  // 🍽️ 주변 음식점 리스트 가져오기
  const foodList = useGetNearFoodList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showFoodList, // 사용자가 음식점 버튼을 클릭했을 때만 호출
  );

  // 🎉 주변 축제/행사/공연 리스트 가져오기
  const festivalList = useGetNearFestivalList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showFestivalList,
  );

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
        showFestivalList={showFestivalList}
        onFoodBtnClick={handleFoodBtnClick}
        onFestivalBtnClick={handleFestivalBtnClick}
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

        {/* 🎉 축제/행사/공연 마커 */}
        {festivalList.map((item, index) => (
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
          <MapModal title="내 주변 음식점" data={foodList} />
        )}
        {showFestivalList && festivalList.length > 0 && (
          <MapModal title="내 주변 축제" data={festivalList} />
        )}
        <Outlet />
      </MapArea>
    </>
  );
}

export default Map;

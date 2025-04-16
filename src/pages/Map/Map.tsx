import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useGetNearFestivalList } from '@/api/openAPI/hooks/map/useGetNearFestivalList';
import { useGetNearFoodList } from '@/api/openAPI/hooks/map/useGetNearFoodList';
import { useGetNearTourList } from '@/api/openAPI/hooks/map/useGetNearTourList';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import MapHeader from '@/components/Map/MapHeader';
import ModalContent from '@/components/Map/ModalContent';

type LatLng = {
  lat: number;
  lng: number;
};

function Map() {
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });

  // 🗺️ 지도 참조 Ref
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 🚩 내 위치 상태 저장
  const [myLocation, setMyLocation] = useState<LatLng | null>(null);

  const [mapSearchParams, setMapSearchParams] = useSearchParams();

  // 필터링 버튼 토글 함수
  const toggleCategoryParams = (targetCategory: string) => {
    const newParams = new URLSearchParams(mapSearchParams);
    const current = newParams.get('category');

    if (current === targetCategory) {
      newParams.delete('category');
    } else {
      newParams.set('category', targetCategory);
    }

    setMapSearchParams(newParams);
  };

  // 선택된 필터링 버튼에 따라 리스트 보여주기
  const activeCategory = useMemo(
    () => mapSearchParams.get('category'),
    [mapSearchParams],
  );
  const showFoodList = useMemo(
    () => activeCategory === 'food',
    [activeCategory],
  );
  const showFestivalList = useMemo(
    () => activeCategory === 'festival',
    [activeCategory],
  );
  const showTourList = useMemo(
    () => activeCategory === 'tour',
    [activeCategory],
  );

  // 📍 필터링 버튼 클릭 핸들러
  const handleFoodBtnClick = () => toggleCategoryParams('food');
  const handleFestivalBtnClick = () => toggleCategoryParams('festival');
  const handleTourBtnClick = () => toggleCategoryParams('tour');

  // 🚩 내 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('내 위치:', latitude, longitude);
        setMyLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('🚫 위치 정보를 가져올 수 없습니다. : ', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  // 📍 주변 카테고리 데이터 가져오기
  const foodList = useGetNearFoodList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showFoodList,
  );

  const festivalList = useGetNearFestivalList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showFestivalList,
  );

  const tourList = useGetNearTourList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    showTourList,
  );

  // 🚩 마커 렌더링 함수
  const renderMarker = (data: any[], markerSrc: string) =>
    data.map((item) => (
      <MapMarker
        key={item.contentid}
        position={{ lat: Number(item.mapy), lng: Number(item.mapx) }}
        image={{
          src: markerSrc,
          size: { width: 24, height: 24 },
          options: { offset: { x: 12, y: 12 } },
        }}
      />
    ));

  if (mapLoading) return <div>🗺️ 지도를 불러오고 있어요!</div>;
  if (mapError) return <div>😭 지도를 불러오는 데 실패했어요.</div>;
  if (!myLocation) return <div>🚩 내 위치를 불러오고 있어요!</div>;

  return (
    <>
      <MapHeader
        mapRef={mapRef}
        myLocation={myLocation}
        onFoodBtnClick={handleFoodBtnClick}
        onFestivalBtnClick={handleFestivalBtnClick}
        onTourBtnClick={handleTourBtnClick}
      />
      <MapArea
        ref={mapRef}
        center={myLocation}
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

        {/* 🚩 마커 */}
        {renderMarker(foodList, '/marker/map_marker.svg')}
        {renderMarker(festivalList, '/marker/map_marker.svg')}
        {renderMarker(tourList, '/marker/map_marker.svg')}

        {/* 다이얼로그 */}
        {showFoodList && foodList.length > 0 && (
          <SlideUpDialog
            header="내 주변 음식점"
            dimd={false}
            dragIcon={true}
            className="max-h-[60%] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={foodList} />
          </SlideUpDialog>
        )}
        {showFestivalList && festivalList.length > 0 && (
          <SlideUpDialog
            header="내 주변 축제/공연/행사"
            dimd={false}
            dragIcon={true}
            className="max-h-[60%] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={festivalList} />
          </SlideUpDialog>
        )}
        {showTourList && tourList.length > 0 && (
          <SlideUpDialog
            header="내 주변 관광지"
            dimd={false}
            dragIcon={true}
            className="max-h-[60%] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={tourList} />
          </SlideUpDialog>
        )}
        <Outlet />
      </MapArea>
    </>
  );
}

export default Map;

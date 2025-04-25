import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet, useSearchParams } from 'react-router-dom';

import {
  useGetNearCulturalList,
  useGetNearFestivalList,
  useGetNearFoodList,
  useGetNearHotelsList,
  useGetNearLeportsList,
  useGetNearShoppingList,
  useGetNearTourList,
} from '@/api/openAPI/hooks/map/useGetNearCategoryList';
import Button from '@/components/Button/Button';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import MapHeader from '@/components/Map/MapHeader';
import ModalContent from '@/components/Map/ModalContent';
import { DetailCommonDataProps } from '@/types/detailCommonDataProps';
import { LatLng } from '@/types/LatLng';

function Map() {
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });

  // 🗺️ 지도 참조 Ref
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 🚩 내 위치 상태 저장
  const [myLocation, setMyLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const [showReSearchButton, setShowReSearchButton] = useState(false);
  const [mapSearchParams, setMapSearchParams] = useSearchParams();

  // 필터링 여부
  const activeCategory = useMemo(
    () => mapSearchParams.get('category'),
    [mapSearchParams],
  );
  const isFiltered = useMemo(() => !!activeCategory, [activeCategory]);

  const showFoodList = activeCategory === 'food';
  const showFestivalList = activeCategory === 'festival';
  const showTourList = activeCategory === 'tour';
  const showLeportsList = activeCategory === 'leports';
  const showShoppingList = activeCategory === 'shopping';
  const showHotelsList = activeCategory === 'hotels';
  const showCulturalList = activeCategory === 'cultural';

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

  // 📍 필터링 버튼 클릭 핸들러
  const handleFoodBtnClick = () => toggleCategoryParams('food');
  const handleFestivalBtnClick = () => toggleCategoryParams('festival');
  const handleTourBtnClick = () => toggleCategoryParams('tour');
  const handleLeportsBtnClick = () => toggleCategoryParams('leports');
  const handleShoppingBtnClick = () => toggleCategoryParams('shopping');
  const handleHotelsBtnClick = () => toggleCategoryParams('hotels');
  const handleCulturalBtnClick = () => toggleCategoryParams('cultural');

  // ✅ 중심 좌표 기준 데이터 fetch
  const foodList = useGetNearFoodList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showFoodList,
  );
  const festivalList = useGetNearFestivalList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showFestivalList,
  );
  const tourList = useGetNearTourList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showTourList,
  );
  const leportsList = useGetNearLeportsList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showLeportsList,
  );
  const shoppingList = useGetNearShoppingList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showShoppingList,
  );
  const hotelsList = useGetNearHotelsList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showHotelsList,
  );
  const culturalList = useGetNearCulturalList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    showCulturalList,
  );

  // 🧭 내 위치 초기화
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        setMyLocation(currentLocation);
        setMapCenter(currentLocation);
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

  // 🗺️ 지도 이동 감지
  const handleCenterChanged = () => {
    const map = mapRef.current;
    if (!map || !mapCenter) return;

    const center = map.getCenter();
    const newCenter = { lat: center.getLat(), lng: center.getLng() };

    const moved =
      Math.abs(mapCenter.lat - newCenter.lat) > 0.001 ||
      Math.abs(mapCenter.lng - newCenter.lng) > 0.001;

    // 🔘 필터링된 상태에서만 버튼 보여주기
    setShowReSearchButton(isFiltered && moved);
  };

  // 📍 현재 위치에서 재검색 클릭
  const handleReSearchClick = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();
    const newCenter = { lat: center.getLat(), lng: center.getLng() };

    setMapCenter(newCenter);
    setShowReSearchButton(false);
  };

  // 🚩 마커 렌더링 함수
  const renderMarker = (data: DetailCommonDataProps[], markerSrc: string) =>
    data.map((item) => (
      <MapMarker
        key={item.contentid}
        position={{ lat: Number(item.mapy), lng: Number(item.mapx) }}
        image={{
          src: markerSrc,
          size: { width: 32, height: 32 },
          options: { offset: { x: 16, y: 16 } },
        }}
      />
    ));

  if (mapLoading) return <div>🗺️ 지도를 불러오고 있어요!</div>;
  if (mapError) return <div>😭 지도를 불러오는 데 실패했어요.</div>;
  if (!myLocation || !mapCenter)
    return <div>🚩 내 위치를 불러오고 있어요!</div>;

  return (
    <>
      <MapHeader
        mapRef={mapRef}
        myLocation={myLocation}
        onFoodBtnClick={handleFoodBtnClick}
        onFestivalBtnClick={handleFestivalBtnClick}
        onTourBtnClick={handleTourBtnClick}
        onLeportsBtnClick={handleLeportsBtnClick}
        onShoppingBtnClick={handleShoppingBtnClick}
        onHotelsBtnClick={handleHotelsBtnClick}
        onCulturalBtnClick={handleCulturalBtnClick}
      />
      <MapArea
        ref={mapRef}
        center={mapCenter}
        onCenterChanged={handleCenterChanged}
        style={{ width: '100%', height: '100%' }}
        className="relative"
        level={3}
      >
        {/* 🚩 내 위치 마커 */}
        <MapMarker
          position={myLocation}
          image={{
            src: '/marker/my_location.svg',
            size: { width: 24, height: 24 },
            options: { offset: { x: 12, y: 12 } },
          }}
        />

        {/* 🚩 마커 */}
        {showFoodList && renderMarker(foodList, '/marker/map_marker_food.svg')}
        {showFestivalList &&
          renderMarker(festivalList, '/marker/map_marker_festival.svg')}
        {showTourList && renderMarker(tourList, '/marker/map_marker_tour.svg')}

        {/* 다이얼로그 */}
        {showFoodList && foodList.length > 0 && (
          <SlideUpDialog
            header="근처 음식점"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={foodList} />
          </SlideUpDialog>
        )}

        {/* 다이얼로그 */}
        {showFestivalList && festivalList.length > 0 && (
          <SlideUpDialog
            header="근처 축제/공연/행사"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={festivalList} />
          </SlideUpDialog>
        )}
        {showTourList && tourList.length > 0 && (
          <SlideUpDialog
            header="근처 관광지"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={tourList} />
          </SlideUpDialog>
        )}
        {showLeportsList && leportsList.length > 0 && (
          <SlideUpDialog
            header="근처 레포츠"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={leportsList} />
          </SlideUpDialog>
        )}
        {showShoppingList && shoppingList.length > 0 && (
          <SlideUpDialog
            header="근처 쇼핑"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={shoppingList} />
          </SlideUpDialog>
        )}
        {showHotelsList && hotelsList.length > 0 && (
          <SlideUpDialog
            header="근처 쇼핑"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={hotelsList} />
          </SlideUpDialog>
        )}
        {showCulturalList && culturalList.length > 0 && (
          <SlideUpDialog
            header="근처 쇼핑"
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={culturalList} />
          </SlideUpDialog>
        )}

        {/* 📌 현재 위치에서 재검색 버튼 */}
        {showReSearchButton && (
          <Button
            className="absolute top-28 left-1/2 z-20 h-[40px] -translate-x-1/2 rounded-full px-4 font-normal shadow-md"
            onClick={handleReSearchClick}
          >
            현재 위치에서 재검색
          </Button>
        )}
        <Outlet />
      </MapArea>
    </>
  );
}

export default Map;

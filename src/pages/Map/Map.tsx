import { useEffect, useRef, useState } from 'react';
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
import { NearItemType } from '@/api/openAPI/hooks/map/useGetNearData';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import MapHeader from '@/components/Map/MapHeader';
import ModalContent from '@/components/Map/ModalContent';
import { useDialogStore } from '@/store/useDialogStore';
import { LatLng } from '@/types/LatLng';

function Map() {
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const { isOpen, openModal } = useDialogStore();
  // 데이터 상태
  const [dataList, setDataList] = useState<NearItemType[]>([]);

  // 위치 정보 가져오기 및 지도 초기화
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

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const handleCategoryBtnClick = () => {
    openModal();
  };

  const foodList = useGetNearFoodList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const festivalList = useGetNearFestivalList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const tourList = useGetNearTourList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const leportsList = useGetNearLeportsList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const shoppingList = useGetNearShoppingList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const hotelsList = useGetNearHotelsList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );
  const culturalList = useGetNearCulturalList(
    myLocation?.lat ?? 0,
    myLocation?.lng ?? 0,
    true,
  );

  const renderModalHeader = (category: string | null) => {
    if (!category) return '';

    switch (category) {
      case 'food':
        return '음식점';
        break;
      case 'festival':
        return '축제/공연/행사';
        break;
      case 'tour':
        return '관광지';
        break;
      case 'leports':
        return '레포츠';
        break;
      case 'shopping':
        return '쇼핑';
        break;
      case 'hotels':
        return '숙박';
        break;
      case 'cultural':
        return '문화시설';
        break;
      default:
        return '';
    }
  };

  useEffect(() => {
    switch (category) {
      case 'food':
        setDataList(foodList);
        break;
      case 'festival':
        setDataList(festivalList);
        break;
      case 'tour':
        setDataList(tourList);
        break;
      case 'leports':
        setDataList(leportsList);
        break;
      case 'shopping':
        setDataList(shoppingList);
        break;
      case 'hotels':
        setDataList(hotelsList);
        break;
      case 'cultural':
        setDataList(culturalList);
        break;
      default:
        setDataList([]);
    }
  }, [
    category,
    foodList,
    festivalList,
    tourList,
    leportsList,
    shoppingList,
    hotelsList,
    culturalList,
  ]);

  if (mapLoading) return <div>🗺️ 지도를 불러오고 있어요!</div>;
  if (mapError) return <div>😭 지도를 불러오는 데 실패했어요.</div>;
  if (!myLocation || !mapCenter)
    return <div>🚩 내 위치를 불러오고 있어요!</div>;

  return (
    <>
      <MapHeader
        mapRef={mapRef}
        myLocation={myLocation}
        isLoggedIn={false}
        onCategoryBtnClick={handleCategoryBtnClick}
      />
      <MapArea
        ref={mapRef}
        center={mapCenter}
        style={{ width: '100%', height: '100%' }}
        className="relative"
        level={3}
      >
        <MapMarker
          position={myLocation}
          image={{
            src: '/marker/my_location.svg',
            size: { width: 24, height: 24 },
            options: { offset: { x: 12, y: 12 } },
          }}
        />
        <Outlet />
        {isOpen ? (
          <SlideUpDialog
            header={renderModalHeader(category)}
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={dataList} />
          </SlideUpDialog>
        ) : null}
      </MapArea>
    </>
  );
}

export default Map;

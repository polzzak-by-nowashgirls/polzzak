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
import Button from '@/components/Button/Button';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import MapHeader from '@/components/Map/MapHeader';
import ModalContent from '@/components/Map/ModalContent';
import ModalDetailContent from '@/components/Map/ModalDetailContent';
import { useAuthStore } from '@/store/useAuthStore';
import { useDialogStore } from '@/store/useDialogStore';
import { DetailCommonDataType } from '@/types/detailCommonDataType';
import { LatLng } from '@/types/LatLng';

function Map() {
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });
  const { isAuthenticated } = useAuthStore();
  const { isOpen, openModal } = useDialogStore();
  const [myLocation, setMyLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng | null>(null);
  const [showReSearchButton, setShowReSearchButton] = useState(false);
  const [dataList, setDataList] = useState<NearItemType[]>([]); // 데이터 상태
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null,
  );
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const isFiltered = category !== null && category.trim() !== '';

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

  const foodList = useGetNearFoodList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const festivalList = useGetNearFestivalList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const tourList = useGetNearTourList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const leportsList = useGetNearLeportsList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const shoppingList = useGetNearShoppingList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const hotelsList = useGetNearHotelsList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
    true,
  );
  const culturalList = useGetNearCulturalList(
    mapCenter?.lat ?? 0,
    mapCenter?.lng ?? 0,
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

  const selectedItem = dataList.find(
    (item) => item.contentid === selectedContentId,
  );

  useEffect(() => {
    switch (category) {
      case 'food':
        setDataList(foodList);
        openModal();
        break;
      case 'festival':
        setDataList(festivalList);
        openModal();
        break;
      case 'tour':
        setDataList(tourList);
        openModal();
        break;
      case 'leports':
        setDataList(leportsList);
        openModal();
        break;
      case 'shopping':
        setDataList(shoppingList);
        openModal();
        break;
      case 'hotels':
        setDataList(hotelsList);
        openModal();
        break;
      case 'cultural':
        setDataList(culturalList);
        openModal();
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
    openModal,
  ]);

  // 🚩 마커 렌더링 함수
  const renderMarker = (data: DetailCommonDataType[]) =>
    data.map((item) => {
      const getMarkerSrc = (contentTypeId: string | undefined): string => {
        switch (contentTypeId) {
          case '39': // 음식점
            return '/marker/map_food.svg';
          case '15': // 축제/공연/행사 (예시)
            return '/marker/map_festival.svg';
          case '12': // 관광지
            return '/marker/map_tour.svg';
          case '28': // 레포츠
            return '/marker/map_leports.svg';
          case '38': // 쇼핑
            return '/marker/map_shopping.svg';
          case '32': // 숙박
            return '/marker/map_hotels.svg';
          case '14': // 문화시설
            return '/marker/map_cultural.svg';
          default:
            return '/marker/map_marker.svg';
        }
      };

      const markerSrc = getMarkerSrc(item.contenttypeid);

      return (
        <MapMarker
          key={item.contentid}
          position={{ lat: Number(item.mapy), lng: Number(item.mapx) }}
          image={{
            src: markerSrc,
            size: { width: 28, height: 28 },
            options: { offset: { x: 14, y: 14 } },
          }}
          onClick={() => {
            console.log('마커 클릭');
            setSelectedContentId(item.contentid ?? null);
            openModal();
          }}
        />
      );
    });

  if (mapLoading) return <div>🗺️ 지도를 불러오고 있어요!</div>;
  if (mapError) return <div>😭 지도를 불러오는 데 실패했어요.</div>;
  if (!myLocation || !mapCenter)
    return <div>🚩 내 위치를 불러오고 있어요!</div>;

  return (
    <>
      <MapHeader
        mapRef={mapRef}
        myLocation={myLocation}
        isLoggedIn={isAuthenticated}
      />
      <MapArea
        ref={mapRef}
        center={mapCenter}
        onCenterChanged={handleCenterChanged}
        style={{ width: '100%', height: '100%' }}
        className="relative"
        level={3}
      >
        <MapMarker
          position={myLocation}
          image={{
            src: '/marker/my_location.svg',
            size: { width: 32, height: 32 },
            options: { offset: { x: 16, y: 16 } },
          }}
        />
        {renderMarker(dataList)}
        <Outlet />
        {showReSearchButton && (
          <Button
            className="absolute top-28 left-1/2 z-20 h-[40px] -translate-x-1/2 rounded-full px-4 font-normal shadow-md"
            onClick={handleReSearchClick}
          >
            현재 위치에서 재검색
          </Button>
        )}
        {isOpen && dataList ? (
          <SlideUpDialog
            header={renderModalHeader(category)}
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalContent data={dataList} />
          </SlideUpDialog>
        ) : null}
        {isOpen && selectedContentId ? (
          <SlideUpDialog
            header={selectedItem?.title ?? renderModalHeader(category)}
            dimd={false}
            dragIcon={true}
            className="shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
          >
            <ModalDetailContent
              data={selectedItem ?? null}
              contentId={selectedContentId}
            />
          </SlideUpDialog>
        ) : null}
      </MapArea>
    </>
  );
}

export default Map;

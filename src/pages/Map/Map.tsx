import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Outlet } from 'react-router-dom';

import MapHeader from '@/components/MapHeader/MapHeader';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

function Map() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'],
  });
  const { isOpen } = useModalStore();

  if (loading) return <div>지도를 불러오는 중...</div>;
  if (error) return <div>지도를 불러오는 데 실패했어요.</div>;

  return (
    <MapArea
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '100%' }}
      className="relative"
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
      <MapHeader />
      <Outlet />
      {isOpen && <Modal mode="slide" type="favorite" />}
    </MapArea>
  );
}

export default Map;

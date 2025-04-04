import {
  Map as MapArea,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';

function Map() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['services'], // 필요 없다면 생략 가능
  });

  if (loading) return <div>지도를 불러오는 중...</div>;
  if (error) return <div>지도를 불러오는 데 실패했어요.</div>;

  return (
    <MapArea
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '100%', height: '100%' }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </MapArea>
  );
}

export default Map;

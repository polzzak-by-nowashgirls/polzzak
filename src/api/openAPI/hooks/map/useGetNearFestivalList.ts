import { useGetNearData } from './useGetNearData';

export function useGetNearFestivalList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '15',
    radius: 5000,
    errorMessage: '🚫 축제/공연/행사 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

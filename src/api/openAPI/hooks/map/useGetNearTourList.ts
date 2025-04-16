import { useGetNearData } from './useGetNearData';

export function useGetNearTourList(lat: number, lng: number, enabled: boolean) {
  return useGetNearData({
    contentTypeId: '12',
    radius: 3000,
    errorMessage: '🚫 관광지 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

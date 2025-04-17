import { useGetNearData } from './useGetNearData';

export function useGetNearFoodList(lat: number, lng: number, enabled: boolean) {
  return useGetNearData({
    contentTypeId: '39',
    radius: 3000,
    errorMessage: '🚫 음식점 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

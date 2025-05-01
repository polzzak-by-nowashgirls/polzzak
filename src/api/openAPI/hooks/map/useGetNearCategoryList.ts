import { useGetNearData } from './useGetNearData';

// 음식점
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

// 축제/행사/공연
export function useGetNearFestivalList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '15',
    radius: 3000,
    errorMessage: '🚫 축제/공연/행사 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

// 관광지
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

// 레포츠
export function useGetNearLeportsList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '28',
    radius: 3000,
    errorMessage: '🚫 레포츠 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

// 쇼핑
export function useGetNearShoppingList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '38',
    radius: 3000,
    errorMessage: '🚫 쇼핑 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

// 숙박
export function useGetNearHotelsList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '32',
    radius: 3000,
    errorMessage: '🚫 숙박 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

// 문화시설
export function useGetNearCulturalList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  return useGetNearData({
    contentTypeId: '14',
    radius: 3000,
    errorMessage: '🚫 문화시설 데이터를 불러오는 중 오류가 발생했습니다.',
    enabled,
    lat,
    lng,
  });
}

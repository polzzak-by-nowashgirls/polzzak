import { useEffect, useState } from 'react';

interface NearbyFoodType {
  contentid: string;
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  tel: string;
}

function useGetNearbyFoodList(lat: number, lng: number, enabled: boolean) {
  const [foodList, setFoodList] = useState<NearbyFoodType[]>([]);

  console.log(foodList);

  useEffect(() => {
    if (!enabled || lat === 0 || lng === 0) return;

    const fetchNearbyFood = async () => {
      try {
        const res = await fetch(
          `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/locationBasedList1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=10&mapX=${lng}&mapY=${lat}&radius=3000&contentTypeId=39`,
        );
        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];
        setFoodList(items);
      } catch (err) {
        console.error('음식점 데이터를 불러오는 중 오류 발생:', err);
      }
    };

    if (lat && lng) {
      fetchNearbyFood();
    }
  }, [lat, lng, enabled]);

  return foodList;
}

export { useGetNearbyFoodList };

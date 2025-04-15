import { useEffect, useState } from 'react';

interface NearFestivalType {
  contentid: string;
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  tel: string;
}

export function useGetNearFestivalList(
  lat: number,
  lng: number,
  enabled: boolean,
) {
  const [festivalList, setFestivalList] = useState<NearFestivalType[]>([]);

  useEffect(() => {
    if (!enabled || lat === 0 || lng === 0) return;

    const fetchNearFestival = async () => {
      try {
        const res = await fetch(
          `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/locationBasedList1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=10&mapX=${lng}&mapY=${lat}&radius=5000&contentTypeId=15`,
        );
        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];
        setFestivalList(items);
      } catch (err) {
        console.error('축제/공연/행사 데이터를 불러오는 중 오류 발생:', err);
      }
    };

    if (lat && lng) {
      fetchNearFestival();
    }
  }, [lat, lng, enabled]);

  return festivalList;
}

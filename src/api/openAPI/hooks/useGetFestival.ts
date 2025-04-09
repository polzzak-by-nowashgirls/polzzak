import { useEffect, useState } from 'react';

interface GetFestival {
  areaCode: string;
  eventStartDate: string;
}

type FestivalListType = Record<string, string>;

function useGetFestival({ areaCode, eventStartDate }: GetFestival) {
  const [festivalList, setFestivalList] = useState<FestivalListType[]>([]);

  useEffect(() => {
    const fetchFestivalList = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_OPEN_API_BASE_URL}/searchFestival1?numOfRows=10&MobileApp=polzzak&areaCode=${areaCode}&MobileOS=ETC&_type=json&serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&eventStartDate=${eventStartDate}`,
        );

        const data = await res.json();
        const items = data?.response?.body?.items?.item;
        const normalized = !items ? [] : Array.isArray(items) ? items : [items];

        setFestivalList(normalized);
      } catch (error) {
        console.error(
          `⚠️ 축제 데이터를 불러오는 중 오류 발생 (areaCode: ${areaCode}, eventStartDate: ${eventStartDate})`,
          error,
        );
      }
    };

    fetchFestivalList();
  }, [areaCode, eventStartDate]);

  return festivalList;
}

export default useGetFestival;

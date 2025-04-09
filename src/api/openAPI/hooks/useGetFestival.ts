import { useEffect, useState } from 'react';

interface FestivalItem {
  firstimage: string;
  sigungucode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  booktour: string;
  tel: string;
  title: string;
  addr1: string;
  areacode: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  firstimage2: string;
  mapx: string;
  contenttypeid: string;
  addr2: string;
  createdtime: string;
  cpyrhtDivCd: string;
}

function useGetFestival(): FestivalItem[] | undefined {
  const [festivalList, setFestivalList] = useState<FestivalItem[]>();

  useEffect(() => {
    const fetchFestivalList = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_OPEN_API_BASE_URL}/searchFestival1?MobileApp=polzzak&MobileOS=ETC&_type=json&serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&eventStartDate=20250301`,
        );

        const data = await res.json();
        const items = data?.response?.body?.items?.item;
        const normalized = Array.isArray(items) ? items : [items];

        setFestivalList(normalized);
      } catch (error) {
        console.error('⚠️ 축제 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchFestivalList();
  }, []);

  if (!festivalList) return;

  return festivalList;
}

export default useGetFestival;

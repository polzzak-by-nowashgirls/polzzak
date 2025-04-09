import { useEffect, useState } from 'react';

interface GetFestival {
  numOfRows?: string;
  areaCodes?: string[];
  pageNo: string;
  eventStartDate: string;
}

type FestivalListType = Record<string, string>;

function useGetFestival({
  numOfRows = '10',
  areaCodes,
  pageNo = '1',
  eventStartDate,
}: GetFestival) {
  const [festivalList, setFestivalList] = useState<FestivalListType[]>([]);

  useEffect(() => {
    const fetchFestivalList = async () => {
      try {
        if (areaCodes && areaCodes.length > 0) {
          const allResponse = await Promise.all(
            areaCodes.map(async (areaCode) => {
              const response = await fetchFestivalData(
                numOfRows,
                areaCode,
                pageNo,
                eventStartDate,
              );

              return response;
            }),
          );

          setFestivalList(allResponse.flat());
        } else {
          const response = await fetchFestivalData(
            numOfRows,
            'none',
            pageNo,
            eventStartDate,
          );

          setFestivalList(response);
        }
      } catch (error) {
        console.error(
          `⚠️ 축제 데이터를 불러오는 중 오류 발생 (areaCode: ${areaCodes}, eventStartDate: ${eventStartDate})`,
          error,
        );
      }
    };

    fetchFestivalList();
  }, [numOfRows, JSON.stringify(areaCodes), pageNo, eventStartDate]);

  return festivalList;
}

export default useGetFestival;

async function fetchFestivalData(
  numOfRows: string,
  areaCode: string,
  pageNo: string,
  eventStartDate: string,
): Promise<FestivalListType[]> {
  const baseUrl = `${import.meta.env.VITE_OPEN_API_BASE_URL}/searchFestival1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}`;

  const params = new URLSearchParams({
    numOfRows,
    pageNo,
    MobileApp: 'polzzak',
    MobileOS: 'ETC',
    _type: 'json',
    eventStartDate,
  });

  if (areaCode !== 'none') {
    params.append('areaCode', areaCode);
  }

  const res = await fetch(`${baseUrl}&${params.toString()}`);

  const data = await res.json();

  const items = data?.response?.body?.items?.item;
  return !items ? [] : Array.isArray(items) ? items : [items];
}

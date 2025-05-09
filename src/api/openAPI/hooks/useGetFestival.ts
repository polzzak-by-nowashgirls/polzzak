import { useEffect, useState } from 'react';

interface GetFestival {
  numOfRows?: string;
  areaCodes?: string[];
  pageNo: string;
  eventStartDate: string;
}

type FestivalListType = Record<string, string>;

// 📍 areaCodes는 무조건 useMemo로 넘겨주세요!
// const areaCodes = useMemo(() => ['1', '2'], []);
function useGetFestival({
  numOfRows = '10',
  areaCodes,
  pageNo = '1',
  eventStartDate,
}: GetFestival) {
  const [festivalList, setFestivalList] = useState<FestivalListType[]>([]);
  const date = beforeMonth(eventStartDate);

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
                date,
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
            date,
          );

          setFestivalList(response);
        }
      } catch (error) {
        console.error(
          `⚠️ 축제 데이터를 불러오는 중 오류 발생 (areaCode: ${areaCodes}, eventStartDate: ${date})`,
          error,
        );
      }
    };

    fetchFestivalList();
  }, [
    numOfRows,
    // JSON.stringify(areaCodes),
    pageNo,
    eventStartDate,
    areaCodes,
    date,
  ]);

  return festivalList;
}

export default useGetFestival;

async function fetchFestivalData(
  numOfRows: string,
  areaCode: string,
  pageNo: string,
  date: string,
): Promise<FestivalListType[]> {
  const baseUrl = `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/searchFestival1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}`;

  const params = new URLSearchParams({
    numOfRows,
    pageNo,
    MobileApp: 'polzzak',
    MobileOS: 'ETC',
    _type: 'json',
    eventStartDate: date,
  });

  if (areaCode !== 'none') {
    params.append('areaCode', areaCode);
  }

  const res = await fetch(`${baseUrl}&${params.toString()}`);

  const data = await res.json();

  const items = data?.response?.body?.items?.item;
  return !items ? [] : Array.isArray(items) ? items : [items];
}

function beforeMonth(eventStartDate: string) {
  const year = parseInt(eventStartDate.slice(0, 4), 10);
  const month = parseInt(eventStartDate.slice(4, 6), 10);
  const day = parseInt(eventStartDate.slice(6, 8), 10);

  const originalDate = new Date(year, month - 1, day);
  originalDate.setMonth(originalDate.getMonth() - 6);

  const yyyy = originalDate.getFullYear();
  const mm = String(originalDate.getMonth() + 1).padStart(2, '0');
  const dd = String(originalDate.getDate()).padStart(2, '0');

  return `${yyyy}${mm}${dd}`;
}

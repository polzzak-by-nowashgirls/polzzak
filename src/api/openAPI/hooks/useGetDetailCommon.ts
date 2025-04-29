import { useEffect, useState } from 'react';

interface detailsTypes {
  overview: string;
  contentid: string;
  sigungucode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  cpyrhtDivCd: string;
  contenttypeid: string;
  booktour: string;
  createdtime: string;
  homepage: string;
  modifiedtime: string;
  tel: string;
  telname: string;
  title: string;
  firstimage: string;
  firstimage2: string;
  areacode: string;
}

function useGetDetailCommon(contentId: string) {
  const [details, setDetails] = useState<detailsTypes[]>([]);

  useEffect(() => {
    const fetchDetailCommon = async () => {
      try {
        const res = await fetch(
          `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/detailCommon1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&&overviewYN=Y`,
        );
        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];

        setDetails(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetailCommon();
  }, [contentId]);

  return details;
}

export { useGetDetailCommon };

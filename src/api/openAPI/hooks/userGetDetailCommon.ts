import { useEffect, useState } from 'react';

function useGetDetailCommon(contentId: string) {
  const [detailsList, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetailCommon = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_OPEN_API_BASE_URL}/detailCommon1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&&overviewYN=Y`,
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

  if (!detailsList) return;

  return detailsList;
}

export { useGetDetailCommon };

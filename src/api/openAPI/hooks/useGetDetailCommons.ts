import { useEffect, useState } from 'react';

import { detailsTypes } from '@/api/openAPI/hooks/useGetDetailCommon';
import supabase from '@/api/supabase';

function useGetDetailCommons(contentIdArr: string[]) {
  const [detailsList, setDetailsList] = useState<detailsTypes[]>([]);

  useEffect(() => {
    if (!contentIdArr || contentIdArr.length === 0) {
      setDetailsList([]);
      return;
    }

    const fetchAllDetails = async () => {
      const result: detailsTypes[] = [];

      const { data: statsList } = await supabase
        .from('ex_contents')
        .select('contentid, likes, reviews')
        .in('contentid', contentIdArr);

      const statsMap = new Map(
        statsList?.map((item) => [item.contentid, item]),
      );

      for (const contentId of contentIdArr) {
        try {
          const commonRes = await fetch(
            `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/detailCommon1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&&overviewYN=Y`,
          );
          const commonData = await commonRes.json();
          const item = commonData?.response?.body?.items?.item?.[0];
          if (!item) return;

          const introRes = await fetch(
            `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/detailIntro1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&contentTypeId=${item?.contenttypeid}`,
          );
          const introData = await introRes.json();
          const intro = introData?.response?.body?.items?.item?.[0];

          const stats = statsMap.get(contentId ?? { likes: 0, reviews: 0 });

          const [region, district] = item.addr1.split(' ') ?? [];
          result.push({
            ...item,
            ...intro,
            ...stats,
            region,
            district,
          });
        } catch (err) {
          console.error(err);
        }
      }
      setDetailsList(result);
    };
    fetchAllDetails();
  }, [contentIdArr?.join(',')]);

  return detailsList;
}

export { useGetDetailCommons };

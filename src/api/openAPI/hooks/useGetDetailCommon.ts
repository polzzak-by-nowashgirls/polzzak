import { useEffect, useState } from 'react';

import { getLikesAndReviews } from '@/api/supabase/utils';

export type detailsTypes = {
  [key: string]: string;
} & {
  likes: number;
  reviews: number;
};

function useGetDetailCommon(contentId: string) {
  const [details, setDetails] = useState<detailsTypes | null>(null);

  useEffect(() => {
    const fetchDetailCommon = async () => {
      try {
        const res = await fetch(
          `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/detailCommon1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&&overviewYN=Y`,
        );
        const commonData = await res.json();
        const item = commonData?.response?.body?.items?.item?.[0];

        if (!item) return;

        const resIntro = await fetch(
          `/tourapi/${import.meta.env.VITE_OPEN_API_BASE_URL}/detailIntro1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileApp=polzzak&MobileOS=ETC&_type=json&pageNo=1&numOfRows=20&contentId=${contentId}&contentTypeId=${item?.contenttypeid}&introYN=Y`,
        );
        const introData = await resIntro.json();
        const intro = introData?.response?.body?.items?.item?.[0];

        const stats = await getLikesAndReviews(contentId);

        setDetails({
          ...item,
          ...intro,
          ...stats,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetailCommon();
  }, [contentId]);

  return details;
}

export { useGetDetailCommon };

import { useEffect, useState } from 'react';

function useGetDetailPetTour() {
  const [petTourInfo, setPetTourInfo] = useState(null);

  useEffect(() => {
    const fetchPetTourInfo = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_OPEN_API_BASE_URL}/detailPetTour1?serviceKey=${import.meta.env.VITE_OPEN_API_KEY}&MobileOS=ETC&MobileApp=polzzak&_type=json`,
        );

        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];

        setPetTourInfo(items);
      } catch (err) {
        console.error('⚠️ 데이터를 불러오는 중 오류 발생:', err);
      }
    };
    fetchPetTourInfo();
  }, []);

  if (!petTourInfo) return;

  return petTourInfo;
}

export { useGetDetailPetTour };

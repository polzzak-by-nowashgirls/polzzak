import { useEffect, useState } from 'react';

function useGetAreaCode() {
  const [areaCodeList, setAreaCodeList] = useState(null);

  useEffect(() => {
    const fetchAreaCode = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_OPEN_API_BASE_URL}/areaCode1?MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=17&_type=json&serviceKey=${import.meta.env.VITE_OPEN_API_KEY}`,
        );
        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];
        setAreaCodeList(items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAreaCode();
  }, []);

  if (!areaCodeList) return;

  return areaCodeList;
}

export { useGetAreaCode };

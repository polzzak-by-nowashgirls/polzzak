import { useEffect, useState } from 'react';

function useGetAreaCode() {
  const [areaCodeList, setAreaCodeList] = useState(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_OPEN_API_BASE_URL}/areaCode1?MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=17&_type=json&serviceKey=${import.meta.env.VITE_OPEN_API_KEY}`,
    )
      .then((res) => res.json())
      .then((res) => setAreaCodeList(res.response.body.items))
      .catch((error) => console.log(error));
  }, []);

  if (!areaCodeList) return;

  return areaCodeList;
}

export { useGetAreaCode };

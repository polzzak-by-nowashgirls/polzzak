import { client } from '@/api/openAPI/client';

interface SearchList {
  keyword: string;
  region: string;
  theme: string[];
}

async function fetchSearchList({ keyword, region, theme }: SearchList) {
  const searchedList = await Promise.all([
    client.get(`/searchKeyword1`, {
      params: {
        keyword: keyword || region || theme.join(','),
        pageNo: 1,
        numOfRows: 20,
      },
    }),
  ]);

  return searchedList[0].data.response.body.items.item;
}

export { fetchSearchList };

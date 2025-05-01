import { client } from '@/api/openAPI/client';

interface SearchList {
  keyword: string;
  region: string;
  theme: string[];
}

const REGION_MAP: Record<string, string> = {
  서울: '1',
  인천: '2',
  대전: '3',
  대구: '4',
  광주: '5',
  부산: '6',
  울산: '7',
  세종: '8',
  경기: '31',
  강원: '32',
  충북: '33',
  충남: '34',
  경북: '35',
  경남: '36',
  전북: '37',
  전남: '38',
  제주: '39',
};
/*
  - A01 : 자연
  - A02 : 인문(문화/예술/역사)
  - A03 : 레포츠
  - A04 : 쇼핑
  - A05 : 음식
  - B02 : 숙박
  - C01 : 추천코스
*/
const THEME_MAP: Record<string, string> = {
  '반려동물과 함께': 'A02',
  '가족 여행': 'A04',
  '커플 여행': 'A04',
  '친구들과 함께': 'A04',
  맛집: 'A05',
  축제: '',
  관광지: '',
  숙박: 'B02',
  // 문화시설: 'A03',
  // 체험: 'A04',
};

async function fetchSearchList({ keyword, region, theme }: SearchList) {
  const results: any[] = [];
  const regionCode = REGION_MAP[region] || '';
  const themeCodes = theme.map((theme_name) => THEME_MAP[theme_name]);
  console.log(themeCodes);

  if (keyword) {
    const keywordResponse = await Promise.all([
      client.get(`/searchKeyword1`, {
        params: {
          keyword: keyword,
          areaCode: regionCode,
          pageNo: 1,
          numOfRows: 20,
        },
      }),
    ]);
    results.push(...(keywordResponse[0].data.response.body.items.item || []));
  }

  if (region) {
    const regionResponse = await Promise.all([
      client.get(`/areaBasedList1`, {
        params: {
          areaCode: regionCode,
          pageNo: 1,
          numOfRows: 20,
        },
      }),
    ]);
    results.push(...(regionResponse[0].data.response.body.items.item || []));
  }

  if (themeCodes.includes('A02')) {
    // > 출력되는 contentId에 맞는 데이터 불러와야함
    const petTourResponse = await Promise.all([
      client.get(`/detailPetTour1`, {
        params: {
          contentId: '1019041',
          pageNo: 1,
          numOfRows: 20,
        },
      }),
    ]);
    results.push(...(petTourResponse[0].data.response.body.items.item || []));
  }

  const uniqueResults = results.reduce((acc, item) => {
    if (!acc.some((existing: any) => existing.contentid === item.contentid)) {
      acc.push(item);
    }
    return acc;
  }, [] as any[]);

  return uniqueResults;
}

export { fetchSearchList };

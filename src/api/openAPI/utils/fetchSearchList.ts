import { client } from '@/api/openAPI/client';

interface SearchList {
  keyword?: string;
  region?: string;
  theme?: string[];
}

interface SearchResult {
  title: string;
  addr1: string;
  contentid: string;
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
const THEME_MAP: Record<string, string> = {
  '반려동물과 함께': 'A02',
  '가족 여행': 'A04',
  '커플 여행': 'A04',
  '친구들과 함께': 'A04',
  맛집: 'A05',
  축제: '',
  관광지: '',
  숙박: 'B02',
};
/* 
#cat1
- A01 : 자연
- A02 : 인문(문화/예술/역사)
- A03 : 레포츠
- A04 : 쇼핑
- A05 : 음식
- B02 : 숙박
- C01 : 추천코스
# contenttypeid 
12:관광지, 14:문화시설, 15:축제공연행사, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점
*/

async function fetchSearchList({
  keyword = '',
  region = '',
  theme = [],
}: SearchList) {
  const results: any[] = [];
  const regionCode = REGION_MAP[region] || '';
  // const themeCodes = theme.map((theme_name) => THEME_MAP[theme_name]);

  try {
    if (keyword) {
      try {
        const keywordResponse = await client.get(`/searchKeyword1`, {
          params: {
            keyword,
            pageNo: 1,
            numOfRows: 20,
          },
        });

        // 응답 구조 안전하게 처리
        const items = keywordResponse?.data?.response?.body?.items?.item;
        if (items) {
          // 단일 항목인 경우 배열로 변환
          const itemsArray = Array.isArray(items) ? items : [items];
          results.push(...itemsArray);
        }
      } catch (error) {
        console.error('키워드 검색 중 오류 발생:', error);
      }
    }

    if (region) {
      try {
        const regionResponse = await client.get(`/areaBasedList1`, {
          params: {
            areaCode: regionCode,
            pageNo: 1,
            numOfRows: 20,
          },
        });

        // 응답 구조 안전하게 처리
        const items = regionResponse?.data?.response?.body?.items?.item;
        if (items) {
          // 단일 항목인 경우 배열로 변환
          const itemsArray = Array.isArray(items) ? items : [items];
          results.push(...itemsArray);
        }
      } catch (error) {
        console.error('지역 검색 중 오류 발생:', error);
      }
    }

    // 테마 검색 코드는 주석 처리되어 있으므로 그대로 유지

    // 중복 제거
    const uniqueResults = results.reduce((acc, item) => {
      if (
        item &&
        item.contentid &&
        !acc.some((existing: any) => existing.contentid === item.contentid)
      ) {
        acc.push(item);
      }
      return acc;
    }, []);

    return uniqueResults;
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

export { fetchSearchList };

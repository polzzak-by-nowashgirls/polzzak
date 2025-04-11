export interface ListItem {
  id: number;
  imgUrl: string;
  title: string;
  start_date: string;
  end_date: string;
  region: string;
  district: string;
  favorite_count: number;
  review_count: number;
}

export const LIST_ITEM_DUMMY_DATA = [
  {
    id: 0,
    imgUrl: '/images/visual_1.png',
    title: '2025 보름왓 튤립 축제2025 보름왓 튤립 축제2025 보름왓 튤립 축제',
    start_date: '2025.03.22',
    end_date: '2025.04.13',
    region: '지역', // areaNm : 관광지 지역명
    district: '시군구 주소', // signguNm : 관광지 시군구명
    favorite_count: 1005,
    review_count: 88,
  },
  {
    id: 1,
    imgUrl: '/images/visual_2.png',
    title: '2025 보름왓 튤립 축제2025 보름왓 튤립 축제2025 보름왓 튤립 축제',
    start_date: '2025.03.22',
    end_date: '2025.04.13',
    region: '지역',
    district: '시군구 주소',
    favorite_count: 107,
    review_count: 88,
  },
  {
    id: 2,
    imgUrl: '/images/visual_3.png',
    title: '2025 보름왓 튤립 축제',
    start_date: '2025.03.22',
    end_date: '2025.04.13',
    region: '지역',
    district: '시군구 주소',
    favorite_count: 10,
    review_count: 88,
  },
  {
    id: 3,
    imgUrl: '/images/splash.png',
    title: '2025 보름왓 튤립 축제',
    start_date: '2025.03.22',
    end_date: '2025.04.13',
    region: '지역',
    district: '시군구 주소',
    favorite_count: 998,
    review_count: 88,
  },
  {
    id: 4,
    imgUrl: '/images/splash.png',
    title: '2025 보름왓 튤립 축제',
    start_date: '2025.03.22',
    end_date: '2025.04.13',
    region: '지역',
    district: '시군구 주소',
    favorite_count: 999,
    review_count: 88,
  },
];

export type ThemeItemList = Pick<
  ListItem,
  'id' | 'imgUrl' | 'title' | 'region'
>;

export interface ThemeItem {
  id: number;
  header: string;
  itemList: ThemeItemList[];
}

export const THEMES_ITEM_DUMMY_DATA: ThemeItem[] = [
  {
    id: 0,
    header: '벚꽃하면 바로 이곳',
    itemList: LIST_ITEM_DUMMY_DATA.map(({ imgUrl, title, region }, idx) => ({
      id: idx,
      imgUrl,
      title,
      region,
    })),
  },
  {
    id: 1,
    header: '이달의 축제',
    itemList: LIST_ITEM_DUMMY_DATA.map(({ imgUrl, title, region }, idx) => ({
      id: idx,
      imgUrl,
      title,
      region,
    })),
  },
  {
    id: 2,
    header: '지금 떠오르는 맛집',
    itemList: LIST_ITEM_DUMMY_DATA.map(({ imgUrl, title, region }, idx) => ({
      id: idx,
      imgUrl,
      title,
      region,
    })),
  },
];

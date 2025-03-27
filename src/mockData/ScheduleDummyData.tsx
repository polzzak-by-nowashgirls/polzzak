import { LIST_ITEM_DUMMY_DATA } from '@/mockData/ListItemDummyData';

export const ScheduleDummyData = [
  {
    id: 0,
    name: '인천에서 술 먹기',
    startDate: new Date(2025, 2, 15),
    endDate: new Date(2025, 2, 16),
    area: ['인천'],
    img: 'rabbit.png',
  },
  {
    id: 1,
    name: '시골쥐 상경하다',
    startDate: new Date(2025, 2, 22),
    endDate: new Date(2025, 2, 23),
    area: ['서울', '인천', '경기'],
    img: 'rabbit.png',
  },
  {
    id: 2,
    name: '떠나요 셋이서',
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 4, 2),
    area: ['부산', '제주'],
    img: 'rabbit.png',
  },
];

interface Bookmark {
  id: number;
  name: string;
  storage: {
    id: number;
    imgUrl: string;
    title: string;
    start_date: string;
    end_date: string;
    region: string;
    district: string;
    favorite_count: number;
    review_count: number;
  }[];
}

export const BookmarkDummyData: Bookmark[] = [
  {
    id: 0,
    name: '기본 폴더',
    storage: LIST_ITEM_DUMMY_DATA,
  },
  {
    id: 1,
    name: '서울 맛집',
    storage: [LIST_ITEM_DUMMY_DATA[0], LIST_ITEM_DUMMY_DATA[1]],
  },
  {
    id: 2,
    name: '제주 여행',
    storage: [],
  },
];

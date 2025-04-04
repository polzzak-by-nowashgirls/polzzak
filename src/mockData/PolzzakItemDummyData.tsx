export interface PolzzakCard {
  id: number;
  place: string;
  time: string;
  memo: string;
}

export interface PolzzakItemList {
  day: number;
  date: string;
  itemList: PolzzakCard[];
}

export const PolzzakItemDummyData: PolzzakItemList[] = [
  {
    day: 1,
    date: '03.15 토',
    itemList: [
      {
        id: 0,
        place: '송도 현대 아울렛',
        time: '',
        memo: '',
      },
      {
        id: 1,
        place: '주안역 왕철판 빈대떡',
        time: '15:00',
        memo: '',
      },
      {
        id: 2,
        place: '월미도',
        time: '11:00',
        memo: '디스코팡팡에서 브레이크 댄스 추기',
      },
    ],
  },
  {
    day: 2,
    date: '03.16 일',
    itemList: [],
  },
  {
    day: 3,
    date: '03.17 월',
    itemList: [],
  },
];

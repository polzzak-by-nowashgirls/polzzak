export interface ListItemType {
  id: string;
  label: string;
  startDate?: string;
  endDate?: string;
  city: string[];
}

export interface PolzzakType {
  title: string;
  img: string;
  list: ListItemType[];
}

export const POLZZAK_LIST: PolzzakType[] = [
  {
    title: '폴짝 중',
    img: 'https://tong.visitkorea.or.kr/cms/resource/55/3480455_image2_1.jpg',
    list: [
      {
        id: 'id#1',
        label:
          '인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 인천에서 술 먹기 ',
        startDate: '2025.03.15',
        endDate: '2025.03.17',
        city: ['인천'],
      },
    ],
  },
  {
    title: '폴짝 준비',
    img: 'https://tong.visitkorea.or.kr/cms/resource/55/3480455_image2_1.jpg',
    list: [
      {
        id: 'id#2',
        label: '시골쥐 상경하다',
        startDate: '2025.04.22',
        endDate: '2025.04.23',
        city: ['인천', '서울'],
      },
      {
        id: 'id#3',
        label: '떠나요 셋이서',
        city: ['제주'],
      },
    ],
  },
  {
    title: '폴짝 완료',
    img: 'https://tong.visitkorea.or.kr/cms/resource/55/3480455_image2_1.jpg',
    list: [
      {
        id: 'id#4',
        label: '부산 갈매기',
        startDate: '2025.01.05',
        endDate: '2025.01.07',
        city: ['부산'],
      },
      {
        id: 'id#5',
        label: '보노보노의 기묘한 모험',
        startDate: '2025.01.05',
        city: ['제주', '여수', '전주'],
      },
    ],
  },
];

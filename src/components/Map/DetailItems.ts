import { formatBr } from '@/lib/formatBr';

type DetailKeyMap = {
  key: string;
  label: string;
  format?: (value: string) => React.ReactNode;
};

export const detailItems: DetailKeyMap[] = [
  // 음식점
  { key: 'opentimefood', label: '영업 시간', format: formatBr },
  { key: 'infocenterfood', label: '문의 및 안내' },
  { key: 'reservationfood', label: '예약 안내' },
  { key: 'restdatefood', label: '쉬는 날' },
  { key: 'firstmenu', label: '대표 메뉴' },
  { key: 'treatmenu', label: '취급 메뉴' },
  { key: 'parkingfood', label: '주차 시설' },
  { key: 'kidsfacility', label: '어린이 놀이방 여부' },
  { key: 'chkcreditcardfood', label: '신용카드 가능 정보' },
  { key: 'packing', label: '포장 가능' },

  // 축제행사공연
  { key: 'eventstartdate', label: '행사 기간' },
  { key: 'playtime', label: '공연 시간' },
  { key: 'eventplace', label: '행사 장소' },
  { key: 'usetimefestival', label: '이용 요금' },
  { key: 'placeinfo', label: '행사장 위치 안내' },

  // 관광지
  { key: 'useseason', label: '이용 시기' },
  { key: 'usetime', label: '이용 시간' },
  { key: 'infocenter', label: '문의 및 안내' },
  { key: 'restdate', label: '쉬는 날' },
  { key: 'parking', label: '주차 시설', format: formatBr },

  // 레포츠
  { key: 'usetimeleports', label: '이용 시간' },
  { key: 'reservation', label: '예약 안내' },
  { key: 'usefeeleports', label: '입장료' },
  { key: 'infocenterleports', label: '문의 및 안내' },
  { key: 'restdateleports', label: '쉬는 날' },
  { key: 'parkingfeeleports', label: '주차 요금' },
  { key: 'parkingleports', label: '주차 시설' },
  { key: 'chkpetleports', label: '애완동물 동반' },

  // 공통
  { key: 'overview', label: '소개' },
];

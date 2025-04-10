import { id } from 'date-fns/locale';
import { useState } from 'react';

const REGIONS_DATA = [
  { id: 0, name: '서울' },
  { id: 1, name: '제주' },
  { id: 2, name: '경기' },
  { id: 3, name: '충남' },
  { id: 4, name: '인천' },
  { id: 5, name: '대구' },
  { id: 6, name: '대전' },
  { id: 7, name: '경남' },
  { id: 8, name: '부산' },
  { id: 9, name: '전북' },
  { id: 10, name: '울산' },
  { id: 11, name: '광주' },
  { id: 12, name: '강원' },
  { id: 13, name: '경북' },
  { id: 14, name: '전남' },
  { id: 15, name: '충북' },
  { id: 16, name: '세종' },
];

const THEME_DATA = [
  { id: 0, name: '가족 여행' },
  { id: 1, name: '커플 여행' },
  { id: 2, name: '친구들과 함께' },
  { id: 3, name: '반려동물과 함께' },
  { id: 4, name: '맛집' },
  { id: 5, name: '축제' },
  { id: 6, name: '관광지' },
];

const MAP_FILTER_DATA = [
  { id: 0, name: '즐겨찾기' },
  { id: 1, name: '나의폴짝' },
  { id: 2, name: '음식점' },
  { id: 3, name: '축제' },
  { id: 4, name: '관광지' },
];

interface ChipProps {
  mode: 'region' | 'theme' | 'map_filter';
  type?: 'default' | 'multiple';
  selectedRegions?: string[];
  hideLabel?: boolean;
  onClick?: (name?: string) => void;
}

function Chip({
  mode,
  type = 'default',
  selectedRegions = [],
  hideLabel = false,
  onClick,
}: ChipProps) {
  const initialData = (
    mode === 'region'
      ? REGIONS_DATA
      : mode === 'theme'
        ? THEME_DATA
        : MAP_FILTER_DATA
  ).map((item) => ({
    ...item,
    selected: selectedRegions.includes(item.name),
  }));

  const [data, setData] = useState(initialData);

  const handleToggle = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        type === 'multiple'
          ? item.id === id
            ? { ...item, selected: !item.selected }
            : item
          : { ...item, selected: item.id === id ? true : false },
      ),
    );
  };

  return (
    <div
      className={`flex flex-col ${hideLabel ? 'gap-0' : 'gap-4'} ${mode === 'map_filter' && '-mx-2'}`}
    >
      <div
        className={`${hideLabel ? 'hidden' : 'flex items-center justify-start gap-2 pl-2'}`}
      >
        <h3 className="fs-14 ls lh font-regular text-black">
          {mode === 'region'
            ? '지역 선택'
            : mode === 'theme'
              ? '테마 선택'
              : '지도 필터'}
        </h3>
        <span className="fs-13 ls lh font-regular text-gray06">
          {type === 'multiple' ? '다중 선택' : '단일 선택'}
        </span>
      </div>
      <ul
        className={`flex gap-2 ${hideLabel ? 'sort-scroll flex-nowrap overflow-scroll' : 'flex-wrap'}`}
        role="list"
      >
        {data.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              handleToggle(item.id);
              onClick?.(item.name);
            }}
            aria-pressed={item.selected}
            tabIndex={0}
            className={`fs-14 font-regular ls lh cursor-pointer rounded-4xl border px-3.5 py-1.5 whitespace-nowrap transition-all ${
              item.selected
                ? 'bg-primary border-primary text-white'
                : 'text-gray07 border-gray07 bg-white'
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chip;

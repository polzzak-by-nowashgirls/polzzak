import { useState } from 'react';

const REGIONS_DATA = [
  { id: 0, name: '서울', selected: false },
  { id: 1, name: '제주', selected: false },
  { id: 2, name: '경기', selected: false },
  { id: 3, name: '충남', selected: false },
  { id: 4, name: '인천', selected: false },
  { id: 5, name: '대구', selected: false },
  { id: 6, name: '대전', selected: false },
  { id: 7, name: '경남', selected: false },
  { id: 8, name: '부산', selected: false },
  { id: 9, name: '전북', selected: false },
  { id: 10, name: '울산', selected: false },
  { id: 11, name: '광주', selected: false },
  { id: 12, name: '강원', selected: false },
  { id: 13, name: '경북', selected: false },
  { id: 14, name: '전남', selected: false },
  { id: 15, name: '충북', selected: false },
  { id: 16, name: '세종', selected: false },
];

const THEME_DATA = [
  { id: 0, name: '가족 여행', selected: false },
  { id: 1, name: '커플 여행', selected: false },
  { id: 2, name: '친구들과 함께', selected: false },
  { id: 3, name: '반려동물과 함께', selected: false },
  { id: 4, name: '맛집', selected: false },
  { id: 5, name: '축제', selected: false },
  { id: 6, name: '관광지', selected: false },
];

interface ChipProps {
  mode: 'region' | 'theme';
  type?: 'default' | 'multiple';
}

function Chip({ mode, type = 'default' }: ChipProps) {
  const [regions, setRegions] = useState(REGIONS_DATA);
  const [themes, setThemes] = useState(THEME_DATA);
  const HandleToggleRegion = (id: number) => {
    setRegions((prev) =>
      type === 'multiple'
        ? prev.map((region) =>
            region.id === id
              ? { ...region, selected: !region.selected }
              : region,
          )
        : prev.map((region) => ({ ...region, selected: region.id === id })),
    );
  };
  const HandleToggleTheme = (id: number) => {
    setThemes((prev) =>
      type === 'multiple'
        ? prev.map((theme) =>
            theme.id === id ? { ...theme, selected: !theme.selected } : theme,
          )
        : prev.map((theme) => ({ ...theme, selected: theme.id === id })),
    );
  };

  return (
    <ul className="flex flex-wrap gap-2" role="list">
      {(mode === 'region' ? regions : themes).map((item) => (
        <li
          key={item.id}
          onClick={() =>
            mode === 'region'
              ? HandleToggleRegion(item.id)
              : HandleToggleTheme(item.id)
          }
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
  );
}

export default Chip;

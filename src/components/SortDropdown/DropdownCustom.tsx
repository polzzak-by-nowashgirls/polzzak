import { useRef, useState } from 'react';

import Dropdown from '@/components/SortDropdown/Dropdown';
import { dropdownData } from '@/mockData/SortDropdownData';

function DropdownCustom() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDown(false);
  };

  const move = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 1.5; // 드래그 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={move}
      onTouchStart={startDragging}
      onTouchEnd={stopDragging}
      onTouchMove={move}
      className="sort-scroll flex flex-nowrap overflow-x-auto p-1"
    >
      {dropdownData.map((data) => (
        <Dropdown key={data.label} label={data.label} options={data.list} />
      ))}
    </div>
  );
}

export default DropdownCustom;

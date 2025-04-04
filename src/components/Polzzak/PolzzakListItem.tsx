import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { ListItemType } from '@/mockData/PolzzakListDummyData';

interface PolzzakListItemProps {
  item: ListItemType;
  img: string;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

function PolzzakListItem({
  item,
  img,
  openMenuId,
  setOpenMenuId,
}: PolzzakListItemProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onClickMore = (e: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenMenuId(openMenuId === item.id ? null : item.id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenMenuId]);

  const onClickEdit = () => {
    navigate(`/polzzak/edit/${item.id}`, { state: { item, img } });
    console.log('해당 아이템 편집 화면(/polzzak/edit)으로 이동');
  };
  const onClickDelete = () => {
    console.log('삭제 모달 표출');
  };

  return (
    <li role="listitem" className="flex flex-row items-center gap-4">
      <figure className="size-20 overflow-hidden rounded-lg">
        <img src={img} alt={item.label} />
      </figure>
      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="fs-14 overflow-hidden font-semibold text-nowrap text-ellipsis text-black">
          {item.label}
        </span>
        <span className="font-regular text-gray07 fs-14 overflow-hidden text-nowrap text-ellipsis">
          {item.startDate
            ? item.endDate
              ? `${item.startDate} ~ ${item.endDate}`
              : item.startDate
            : '날짜 미정'}
        </span>
        <span className="font-regular text-gray07 fs-14 overflow-hidden text-nowrap text-ellipsis">
          {item.city.length === 1
            ? item.city[0]
            : `${item.city[0]} 외 ${item.city.length - 1}개 도시`}
        </span>
      </div>
      <div className="relative">
        <Button
          variant="tertiary"
          size="md"
          className="bg-white"
          onClick={onClickMore}
        >
          <Icon id="more" />
        </Button>
        {openMenuId === item.id && (
          <div
            ref={menuRef}
            className="border-gray03 absolute right-1 z-10 w-fit rounded-md border bg-white p-1"
          >
            {[
              { label: '편집하기', onClick: onClickEdit },
              { label: '삭제하기', onClick: onClickDelete },
            ].map(({ label, onClick }, index) => (
              <Button
                key={index}
                variant="tertiary"
                size="md"
                className="hover:bg-gray02 fs-14 font-regular h-9 rounded-sm bg-white px-3 hover:text-black active:text-black"
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default PolzzakListItem;

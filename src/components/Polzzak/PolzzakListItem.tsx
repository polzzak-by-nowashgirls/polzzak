import { ListItemType } from '@/mockData/PolzzakListDummyData';

interface PolzzakListItemProps {
  item: ListItemType;
  img: string;
}

function PolzzakListItem({ item, img }: PolzzakListItemProps) {
  return (
    <li role="listitem" className="flex flex-row items-center gap-4">
      <figure className="size-20 overflow-hidden rounded-lg">
        <img src={img} alt={item.label} />
      </figure>
      <div className="flex flex-1 flex-col">
        <span className="fs-14 font-semibold text-black">{item.label}</span>
        <span className="font-regular text-gray07 fs-14">
          {item.startDate
            ? item.endDate
              ? `${item.startDate} ~ ${item.endDate}`
              : item.startDate
            : '날짜 미정'}
        </span>
        <span className="font-regular text-gray07 fs-14">
          {item.city.length === 1
            ? item.city[0]
            : `${item.city[0]} 외 ${item.city.length - 1}개 도시`}
        </span>
      </div>
    </li>
  );
}

export default PolzzakListItem;

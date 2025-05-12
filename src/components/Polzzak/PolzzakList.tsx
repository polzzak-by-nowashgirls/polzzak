import PolzzakListItem from '@/components/Polzzak/PolzzakListItem';
import PolzzakSection from '@/components/Polzzak/PolzzakSection';
import { ListItemType } from '@/pages/Polzzak/Polzzak';

function PolzzakList({
  data,
  refetch,
  searchData,
  isSearching = false,
}: {
  data: ListItemType[];
  refetch: () => Promise<void>;
  searchData?: ListItemType[];
  isSearching?: boolean;
}) {
  const section: [string[], ListItemType[]][] = [
    [['/images/rabbit_face.png', '폴짝 중'], []],
    [['/images/backpack.png', '폴짝 준비'], []],
    [['/images/flag.png', '폴짝 완료'], []],
  ];
  const compareDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = compareDate(new Date());

  data.forEach((item) => {
    const start = item.startDate ? compareDate(new Date(item.startDate)) : null;
    const end = item.endDate ? compareDate(new Date(item.endDate)) : null;

    if (!start) {
      section[1][1].push(item);
    } else if (
      (start.getTime() === today.getTime() && !end) ||
      (start <= today && end && end >= today)
    ) {
      section[0][1].push(item);
    } else if (start < today) {
      section[2][1].push(item);
    } else {
      section[1][1].push(item);
    }
  });

  return (
    <div className="flex flex-col gap-6">
      {isSearching ? (
        searchData?.length ? (
          <ul className="flex flex-col gap-4">
            {searchData.map((item, idx) => (
              <PolzzakListItem
                key={`${item.name}${idx}`}
                item={item}
                onDeleted={refetch}
              />
            ))}
          </ul>
        ) : (
          <p className="bg-gray01 text-gray07 fs-14 rounded-sm px-4 py-2">
            검색결과가 없습니다.
          </p>
        )
      ) : (
        section.map((i, idx) => (
          <PolzzakSection
            key={`${i[0][2]}${idx}`}
            title={i[0]}
            items={i[1]}
            refetch={refetch}
          />
        ))
      )}
    </div>
  );
}

export default PolzzakList;

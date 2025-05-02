import PolzzakSection from '@/components/Polzzak/PolzzakSection';
import { ListItemType } from '@/pages/Polzzak/Polzzak';

function PolzzakList({ data }: { data: ListItemType[] }) {
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
    } else if (start <= today && end && end >= today) {
      section[0][1].push(item);
    } else if (start < today) {
      section[2][1].push(item);
    } else {
      section[1][1].push(item);
    }
  });

  return (
    <div className="flex flex-col gap-6">
      {section.map((i, idx) => (
        <PolzzakSection key={`${i[0][2]}${idx}`} title={i[0]} items={i[1]} />
      ))}
    </div>
  );
}

export default PolzzakList;

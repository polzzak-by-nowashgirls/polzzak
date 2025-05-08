import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';

import TimelineCard from '@/components/Timeline/TimelineCard';
import { ScheduleList } from '@/pages/Polzzak/Schedule/Schedule';

interface TimelineListProps {
  itemList: ScheduleList[];
  isEditMode: boolean;
}

function TimelineList({ itemList, isEditMode }: TimelineListProps) {
  const [cards, setCards] = useState(itemList); // 서버 저장
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  useEffect(() => {
    setCards(itemList);
  }, [itemList]);

  return (
    <Reorder.Group
      axis="y"
      values={cards.map((c) => c.id)}
      onReorder={(newOrder) => {
        const reordered = newOrder.map((id) => cards.find((c) => c.id === id)!);
        setCards(reordered);
      }}
      className="relative flex"
    >
      <div className="bg-gray03 absolute mx-[5px] h-full w-[1px]"></div>
      <div className="flex w-full flex-col gap-2">
        {cards.map((card) => (
          <TimelineCard
            key={card.id}
            data={card}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            isEditcard={isEditMode}
          />
        ))}
      </div>
    </Reorder.Group>
  );
}

export default TimelineList;

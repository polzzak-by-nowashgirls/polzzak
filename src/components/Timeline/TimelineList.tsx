import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';

import TimelineCard from '@/components/Timeline/TimelineCard';
import { ScheduleList } from '@/pages/Polzzak/Schedule/Schedule';

interface TimelineListProps {
  itemList: ScheduleList[];
}

function TimelineList({ itemList }: TimelineListProps) {
  const [cards, setCards] = useState<ScheduleList[]>(itemList);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  useEffect(() => {
    setCards(itemList);
  }, [itemList]);

  return (
    <Reorder.Group
      axis="y"
      values={cards}
      onReorder={setCards}
      className="relative flex"
    >
      <div className="bg-gray03 absolute mx-[5px] h-full w-[1px]"></div>
      <div className="flex w-full flex-col gap-2">
        {cards.map((card) => (
          <TimelineCard
            key={card.schedule_id}
            value={card}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
          />
        ))}
      </div>
    </Reorder.Group>
  );
}

export default TimelineList;

import { Reorder } from 'framer-motion';
import { useState } from 'react';

import TimelineCard from '@/components/Timeline/TimelineCard';
import {
  PolzzakCard,
  PolzzakItemDummyData,
} from '@/mockData/PolzzakItemDummyData';

function TimelineList({ data = PolzzakItemDummyData[0] }) {
  const [cards, setCards] = useState<PolzzakCard[]>(data.itemList);
  // 정렬된 상태 저장 시 cards 저장!

  const [openCardId, setOpenCardId] = useState<number | null>(null);

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
            key={card.id}
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

import Button from '@/components/Button/Button';
import { PolzzakItemList } from '@/mockData/PolzzakItemDummyData';

import TimelineList from './TimelineList';

interface TimelineScheduleProps {
  schedule: PolzzakItemList[];
}

function TimelineSchedule({ schedule }: TimelineScheduleProps) {
  return (
    <div className="flex flex-col gap-4">
      {schedule.map((daySchedule) => (
        <section key={daySchedule.day} className="flex flex-col gap-4">
          <h3>
            Day {daySchedule.day}
            <span className="text-gray06 font-regular pl-2">
              {daySchedule.date}
            </span>
          </h3>
          <TimelineList itemList={daySchedule.itemList} />
          <Button variant={'secondary'}>폴짝! 한 걸음 추가하기</Button>
        </section>
      ))}
    </div>
  );
}

export default TimelineSchedule;

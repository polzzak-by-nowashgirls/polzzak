import Button from '@/components/Button/Button';
import SlideUpDialog from '@/components/Dialog/SlideUpDialog';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { Textarea } from '@/components/Input/Textarea';
import TimelineList from '@/components/Timeline/TimelineList';
import { ScheduleDetail } from '@/pages/Polzzak/Schedule/Schedule';
import { useDialogStore } from '@/store/useDialogStore';

interface TimelineScheduleProps {
  schedule: ScheduleDetail[];
}

function TimelineSchedule({ schedule }: TimelineScheduleProps) {
  const { isOpen, openModal, closeModal } = useDialogStore();

  const handleAddSchedule = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const addBtn = [
    {
      text: '취소',
      onclick: () => {
        closeModal();
      },
    },
    {
      text: '저장',
      onClick: () => {
        console.log('저장완료!');
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {schedule.map((daySchedule) => (
        <section key={daySchedule.day} className="flex flex-col gap-4">
          <h3>
            {daySchedule.day}
            <span className="text-gray06 font-regular pl-2">
              {daySchedule.date}
            </span>
          </h3>
          {daySchedule.items.length > 0 && (
            <TimelineList itemList={daySchedule.items} />
          )}
          <Button variant={'secondary'} onClick={handleAddSchedule}>
            폴짝! 한 걸음 추가하기
          </Button>
        </section>
      ))}
      {isOpen && (
        <SlideUpDialog header="폴짝! 한 걸음 추가하기" button={addBtn}>
          <Input label="장소">
            <Icon id="map_search" className="text-gray05" />
          </Input>
          <Input label="시간">
            <Icon id="time" className="text-gray05" />
          </Input>
          <Textarea label="메모" />
        </SlideUpDialog>
      )}
    </div>
  );
}

export default TimelineSchedule;

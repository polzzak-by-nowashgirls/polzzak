import {
  animate,
  motion,
  Reorder,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { cn } from '@/lib/utils';
import { ScheduleList } from '@/pages/Polzzak/Schedule/Schedule';

interface TimelineCard {
  value: ScheduleList;
  openCardId: string | null;
  setOpenCardId: (id: string | null) => void;
}

function TimelineCard({ value, openCardId, setOpenCardId }: TimelineCard) {
  const { schedule_id, place, time, memo } = value;

  const isOpen = openCardId === schedule_id;
  const controls = useDragControls();
  const x = useMotionValue(0);

  const dragOpacity = useTransform(x, [-55, -10], [0, 1]);
  const scale = useTransform(x, [-55, -10], [0.8, 1]);
  const btnOpacity = useTransform(x, [-55, 0], [1, 0]);
  const btnTranslate = useTransform(x, [-55, 0], [0, 100]);

  useEffect(() => {
    if (!isOpen) animate(x, 0);
  }, [x, isOpen, controls]);

  const handleDragEnd = () => {
    if (x.get() > -40) {
      animate(x, 0);
      setOpenCardId(null);
    } else {
      animate(x, -55);
      setOpenCardId(schedule_id);
    }
  };

  const onClickOpenEditModal = () => {
    console.log('‼️ Open Modal ‼️');
  };

  const handleEditButton = () => {
    animate(x, 0);
    setOpenCardId(null);
    onClickOpenEditModal();
  };

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      className={cn('relative flex w-full gap-4 overflow-hidden')}
    >
      <div className="w-[11px]">
        <div className="bg-primary absolute top-[26px] z-50 h-[11px] w-[11px] -translate-y-1/2 rounded-full"></div>
      </div>

      <article className="relative min-w-0 flex-1 bg-white">
        <motion.div
          drag={'x'}
          dragConstraints={{ left: -55, right: 0 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 z-10 h-full w-[calc(100%-48px)]"
        ></motion.div>

        <header
          className={cn(
            'border-gray03 flex items-center items-stretch justify-between rounded-md border py-3 pl-4',
          )}
        >
          <div className="min-w-0 flex-1">
            <h4 className="fs-14 inline-block font-semibold">{place}</h4>
            {time && (
              <time className="fs-14 text-gray08 ml-1" dateTime={time}>
                {time}
              </time>
            )}
            {memo && (
              <p className="fs-14 text-gray07 w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {memo}
              </p>
            )}
          </div>
          <motion.div
            style={{ opacity: dragOpacity, scale }}
            className="flex flex-shrink-0 items-center px-4 select-none"
            onPointerDown={(e) => {
              controls.start(e);
              setOpenCardId(schedule_id);
            }}
          >
            <Icon id={'drag_handle'} className="text-gray05" size={16} />
          </motion.div>
        </header>

        <motion.footer
          style={{ x: btnTranslate, opacity: btnOpacity }}
          className="absolute top-0 right-0 flex h-full items-center"
        >
          <Button
            size={'md'}
            className="m-0 h-full w-[50px] rounded-l-none"
            onClick={handleEditButton}
          >
            편집
          </Button>
        </motion.footer>
      </article>
    </Reorder.Item>
  );
}

export default TimelineCard;

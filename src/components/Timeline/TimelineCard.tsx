// import Button from '@/components/Button/Button';

import { Reorder, useDragControls } from 'framer-motion';

import Icon from '@/components/Icon/Icon';
import { cn } from '@/lib/utils';
import { PolzzakCard } from '@/mockData/PolzzakItemDummyData';

interface TimelineCard {
  value: PolzzakCard;
}

function TimelineCard({ value }: TimelineCard) {
  const controls = useDragControls();

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

      <article className="min-w-0 flex-1 bg-white">
        <header
          className={cn(
            'border-gray03 flex items-center items-stretch justify-between rounded-md border py-3 pl-4',
          )}
        >
          <div className="min-w-0 flex-1">
            <h4 className="fs-14 inline-block font-semibold">{value.place}</h4>
            {value.time && (
              <time className="fs-14 text-gray08 ml-1" dateTime={value.time}>
                {value.time}
              </time>
            )}
            {value.memo && (
              <p className="fs-14 text-gray07 w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {value.memo}
              </p>
            )}
          </div>
          <div
            className="flex flex-shrink-0 items-center bg-red-100 px-4 select-none hover:bg-red-500"
            onPointerDown={(e) => {
              console.log(controls.start(e));
            }}
          >
            <Icon id={'drag_handle'} className="text-gray05" size={16} />
          </div>
        </header>
        {/* <footer>
            <Button>편집</Button>
          </footer> */}
      </article>
    </Reorder.Item>
  );
}

export default TimelineCard;

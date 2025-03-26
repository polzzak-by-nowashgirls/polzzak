import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import * as React from 'react';

import SelectMenu from '@/components/Input/SelectMenu';
import { Label } from '@/components/Label';
import { getTripDays } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { ScheduleDummyData } from '@/mockData/ScheduleDummyData';

// 임시로 타입 정의함
interface BaseSchedule {
  id: number;
  name: string;
}

interface ScheduleWithDate extends BaseSchedule {
  startDate: Date;
  endDate: Date;
  area?: string[];
  img?: string;
}

interface ScheduleWithoutDate extends BaseSchedule {
  storage: string[];
}

interface RadioProps {
  data?: ScheduleWithDate[] | ScheduleWithoutDate[];
  className?: string;
}

// data 기본값으로 더미데이타
function Radio({ data = ScheduleDummyData, className }: RadioProps) {
  const [selected, setSelected] = React.useState('radio0');

  return (
    <RadioGroup value={selected} onValueChange={setSelected}>
      {data.map((item) => {
        const isChecked = selected === `radio${item.id}`;
        return (
          <div
            key={item.id}
            className={cn(
              'flex items-center rounded-md border px-4 py-2 transition-colors',
              'hover:border-primary-hover active:border-primary-active',
              isChecked ? 'border-primary' : 'border-gray05',
              className,
            )}
          >
            <RadioGroupItem
              value={`radio${item.id}`}
              id={`radio${item.id}`}
              className="border-gray05 size-5 rounded-full border"
            />
            {isChecked && 'startDate' in item && 'endDate' in item ? (
              <AddSchedule data={item} />
            ) : (
              <Label
                htmlFor={`radio${item.id}`}
                className="ml-2 px-0 font-medium"
              >
                {item.name}
              </Label>
            )}
            {'storage' in item && (
              <p className="fs-14 lh text-primary pl-1 font-semibold">
                {item.storage.length}
              </p>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}

type AddScheduleProps = {
  data: ScheduleWithDate;
};

function AddSchedule({ data }: AddScheduleProps) {
  const { range } = getTripDays(data);

  return (
    <div className="ml-2 w-full">
      <div>
        <Label htmlFor={`radio${data.id}`} className="px-0 font-medium">
          {data.name}
        </Label>
        <p className="fs-14 text-gray06 lh">{range}</p>
      </div>
      <SelectMenu data={data} className="mx-0.5" />
    </div>
  );
}

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-2', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'text-primary focus-visible:border-ring focus-visible:ring-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive aspect-square size-5 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
        'border-gray05 data-[state=checked]:border-primary hover:border-primary-hover active:border-primary-active border-2',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { Radio, RadioGroup, RadioGroupItem };

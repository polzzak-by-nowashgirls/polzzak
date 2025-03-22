import { useState } from 'react';

import Button from '@/components/Button/Button';
import { DETAILS_DUMMY_DATA } from '@/mockData';

interface DetailsProps {
  type: 'guide' | 'detail';
  children: React.ReactNode;
}

function Details({ type, children }: DetailsProps) {
  const CONTENT_DATA = DETAILS_DUMMY_DATA;
  const GUIDE_LIST = [
    { id: 0, label: '행사명', value: CONTENT_DATA.title },
    {
      id: 1,
      label: '날짜',
      value: `${CONTENT_DATA.start_date} ~ ${CONTENT_DATA.end_date}`,
    },
    { id: 2, label: '주소', value: CONTENT_DATA.location },
    { id: 3, label: '문의', value: CONTENT_DATA.phone_number },
    { id: 4, label: '입장료', value: CONTENT_DATA.charge },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <h3 className="text-14 font-Bold border-b-gray03 w-full border-b border-solid p-2 text-black">
        {children}
      </h3>
      {type === 'guide' ? (
        <dl className="flex w-full flex-col gap-1 px-2">
          {GUIDE_LIST.map((info) => (
            <div
              className="text-13 text-Regular flex items-start justify-start gap-2 text-black"
              key={info.id}
            >
              <dt className="font-SemiBold w-[40px] whitespace-nowrap">
                {info.label}
              </dt>
              <div className="flex flex-col">
                {info.value === CONTENT_DATA.charge ? (
                  CONTENT_DATA.charge.map((i, index) => (
                    <dd key={index}>{i}</dd>
                  ))
                ) : (
                  <dd>{info.value}</dd>
                )}
              </div>
            </div>
          ))}
        </dl>
      ) : (
        <>
          <p
            className={`text-13 font-Regular px-2 text-black ${isOpen ? 'h-auto' : 'h-[84px] overflow-hidden'}`}
          >
            {children === '행사 소개'
              ? CONTENT_DATA.event_intro
              : CONTENT_DATA.event_content}
          </p>
          <Button
            onClick={toggleIsOpen}
            variant="tertiary"
            className="text-13 text-gray07 font-Regular h-[1.3125rem] w-full p-0"
          >{`${isOpen ? '접기' : '더보기'}`}</Button>
        </>
      )}
    </div>
  );
}

export default Details;

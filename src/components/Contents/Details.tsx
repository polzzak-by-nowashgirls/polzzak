import { useState } from 'react';

import Button from '@/components/Button/button';

interface DetailsProps {
  type: 'guide' | 'detail';
  children: React.ReactNode;
}

const DUMMY_DATA = {
  id: 0,
  title: '보롬왓 튤립 축제',
  region: '제주',
  location: '제주 서귀포시 표선면 번영로 2350-104',
  event_intro: `제주 보롬왓 튤립축제는 매년 봄, 제주 서귀포시 표선면에 위치한 보롬왓에서 열리는 대표적인 꽃 축제이다. '보롬왓'은 제주어로 '바람이 부는 밭'을 의미하며, 넓은 들판을 가득 메운 형형색색의 튤립이 아름답게 장식한다. 축제 기간 동안 방문객들은 다양한 색상의 튤립이 펼쳐진 아름다운 풍경을 감상하며, 제주 봄의 생동감을 만끽할 수 있습니다. 또한, 포토존과 산책로가 잘 조성되어 있어 가족, 연인, 친구들과 함께 추억을 남길 수 있다.`,
  event_content: `예산향교는 조선 태종 13년(1413)에 처음 지었다고 전한다. 순조 9년(1809)에 크게 수리하였으며, 1975년과 1976년에 동재와 서재를 보수하였다. 지금 남아 있는 건물로는 대성전, 명륜당, 동재, 서재 등이다. 매년 음력 2월과 8월에 대제를 지내고 있다. 건물은 구릉지를 2단으로 정리한 다음 앞쪽에는 명륜당을 두고 뒤로 이어지면서 동서재가 U자형으로 배치되며, 그 뒤에 내 삼문이 있고 대성전 앞에 배치된 전학후묘(前學後廟)식 배치이다. 대성전은 정면 3칸, 측면 3칸인데 전면 1칸 열은 뒷칸이며, 공포는 외1출목 2익공(翼工) 형식이다. 가구는 1고주(高柱) 5량집(樑架) 구조에 정면만 겹처마로 된 맞배지붕이다. 명륜당은 정면 3칸, 측면 3칸이고, 내부는 벽을 두지 않는 통간바닥에 우물마루를 깔았으며, 가구는 무고주(無高柱)5량집 구조이고 겹처마 맞배지붕이다.`,
  start_date: '20250322',
  end_date: '20250413',
  event_time: '09:00~18:00',
  phone_number: '010-7362-2345',
  charge: [
    '성인/청소년 6000원',
    '경로/도민/복지할인 5000원',
    '어린이 4000원 (24개월 미만 무료입장)',
  ],
};

const GUIDE_LIST = [
  { id: 0, label: '행사명', value: DUMMY_DATA.title },
  {
    id: 1,
    label: '날짜',
    value: `${DUMMY_DATA.start_date} ~ ${DUMMY_DATA.end_date}`,
  },
  { id: 2, label: '주소', value: DUMMY_DATA.location },
  { id: 3, label: '문의', value: DUMMY_DATA.phone_number },
  { id: 4, label: '입장료', value: DUMMY_DATA.charge },
];

function Details({ type, children }: DetailsProps) {
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
                {info.value === DUMMY_DATA.charge ? (
                  DUMMY_DATA.charge.map((i, index) => <dd key={index}>{i}</dd>)
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
              ? DUMMY_DATA.event_intro
              : DUMMY_DATA.event_content}
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

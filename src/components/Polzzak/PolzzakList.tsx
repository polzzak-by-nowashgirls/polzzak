import { POLZZAK_LIST, PolzzakType } from '@/mockData/PolzzakListDummyData';

import PolzzakListItem from './PolzzakListItem';

// 한글 받침 여부에 따라 조사 결정
const getParticle = (str: string) =>
  (str.charCodeAt(str.length - 1) - 0xac00) % 28 !== 0 ? '이' : '가';

// title에 따라 이모지 추가
const getTitleWithEmoji = (title: string) => {
  const emojiMap: { [key: string]: string } = {
    '폴짝 중': '🐰',
    '폴짝 준비': '🎒',
    '폴짝 완료': '🏁',
  };
  return `${emojiMap[title] || ''} ${title}`;
};

function PolzzakList() {
  return (
    <div className="flex flex-col gap-6">
      {POLZZAK_LIST.map((data: PolzzakType) => (
        <section key={data.title} className="flex flex-col gap-2">
          <h3 className="fs-14 flex items-center gap-2 font-semibold text-black">
            {getTitleWithEmoji(data.title)}
            <span className="text-primary">{data.list.length}</span>
          </h3>
          <ul role="group" className="flex flex-col gap-4">
            {data.list.length === 0 ? (
              <li className="bg-gray01 text-gray07 fs-14 rounded-sm px-4 py-2">
                {data.title}
                {getParticle(data.title)} 비어있습니다.
              </li>
            ) : (
              data.list.map((item) => (
                <PolzzakListItem key={item.label} item={item} img={data.img} />
              ))
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default PolzzakList;

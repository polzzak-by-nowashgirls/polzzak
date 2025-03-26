import {
  ListItemType,
  POLZZAK_LIST,
  PolzzakType,
} from '@/mockData/PolzzakListDummyData';

function ListItem() {
  // 한글 받침 여부 확인
  const hasFinalConsonant = (str: string) => {
    const lastChar = str[str.length - 1];
    const code = lastChar.charCodeAt(0);
    return (code - 0xac00) % 28 !== 0;
  };

  return (
    <div className="flex flex-col gap-6">
      {POLZZAK_LIST.map((data: PolzzakType) => {
        let titleWithEmoji;

        // title에 따라 이모지 추가
        if (data.title === '폴짝 중') {
          titleWithEmoji = `🐰 ${data.title}`;
        } else if (data.title === '폴짝 준비') {
          titleWithEmoji = `🎒 ${data.title}`;
        } else if (data.title === '폴짝 완료') {
          titleWithEmoji = `🏁 ${data.title}`;
        } else {
          titleWithEmoji = data.title;
        }

        const particle = hasFinalConsonant(data.title) ? '이' : '가';

        return (
          <section key={data.title} className="flex flex-col gap-2">
            <h3 className="fs-14 flex items-center gap-2 font-semibold text-black">
              {titleWithEmoji}{' '}
              <span className="text-primary">{data.list.length}</span>
            </h3>
            <ul role="group" className="flex flex-col gap-4">
              {data.list.length === 0 ? (
                <li className="bg-gray01 text-gray07 fs-14 rounded-sm px-4 py-2">
                  {data.title}
                  {particle} 비어있습니다.
                </li>
              ) : (
                data.list.map((item: ListItemType) => (
                  <li
                    key={item.label}
                    role="listitem"
                    className="flex flex-row items-center gap-4"
                  >
                    <figure className="size-20 overflow-hidden rounded-lg">
                      <img src={data.img} alt={item.label} />
                    </figure>
                    <div className="flex flex-1 flex-col">
                      <span className="fs-14 font-semibold text-black">
                        {item.label}
                      </span>
                      <span className="font-regular text-gray07 fs-14">
                        {item.startDate
                          ? item.endDate
                            ? `${item.startDate} ~ ${item.endDate}`
                            : item.startDate
                          : '날짜 미정'}
                      </span>
                      <span className="font-regular text-gray07 fs-14">
                        {item.city.length === 1
                          ? item.city[0]
                          : `${item.city[0]} 외 ${item.city.length - 1}개 도시`}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default ListItem;

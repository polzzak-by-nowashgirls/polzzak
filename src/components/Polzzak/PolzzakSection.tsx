import { ListItemType } from '@/pages/Polzzak/Polzzak';

import PolzzakListItem from './PolzzakListItem';

function PolzzakSection({
  title,
  items,
}: {
  title: string[];
  items: ListItemType[];
}) {
  const getParticle = (str: string) =>
    (str.charCodeAt(str.length - 1) - 0xac00) % 28 !== 0 ? '이' : '가';

  return (
    <div>
      <section>
        <h3 className="fs-14 flex items-center gap-2 font-semibold text-black">
          <img
            src={title[0]}
            alt={title[1]}
            aria-hidden={true}
            className="h-4 w-4"
          />
          {title[1]}
          <span className="text-primary">{items.length}</span>
        </h3>
        <ul role="group" className="flex flex-col gap-4">
          {items.length === 0 ? (
            <li className="bg-gray01 text-gray07 fs-14 rounded-sm px-4 py-2">
              {title[1]}
              {getParticle(title[1])} 비어있습니다.
            </li>
          ) : (
            items.map((item) => <PolzzakListItem key={item.name} item={item} />)
          )}
        </ul>
      </section>
    </div>
  );
}

export default PolzzakSection;

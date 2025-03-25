import { useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { LIST_ITEM_DUMMY_DATA } from '@/mockData/ListItemDummyData';

function ListItem() {
  const ListItemData = LIST_ITEM_DUMMY_DATA;
  const [isCheck, setIsCheck] = useState(ListItemData.map(() => false));
  const [favoriteCount, setFavoriteCount] = useState(
    ListItemData.map((count) => count.favorite_count),
  );
  const handleFavorite = (id: number) => {
    setIsCheck((prev) =>
      prev.map((state, index) =>
        ListItemData[index].id === id ? !state : state,
      ),
    );

    setFavoriteCount((prev) =>
      prev.map((count, index) =>
        index === id ? (isCheck[id] ? count - 1 : count + 1) : count,
      ),
    );
  };

  return (
    <ul className="flex flex-col gap-6">
      {ListItemData.map((item) => (
        <li
          className="flex-start relative flex w-full items-center gap-4"
          key={item.id}
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl object-cover">
            <img src={item.imgUrl} alt={item.title} className="h-full w-full" />
          </div>
          <div className="flex w-0 flex-1 flex-col">
            <div className="flex items-center justify-between">
              <h3
                className="fs-14 ls lh w-full truncate font-semibold text-black"
                aria-label={item.title}
              >
                {item.title}
              </h3>
              <Button
                variant="tertiary"
                size="md"
                className='text-primary [&_svg:not([class*="size-"])]:size-5'
                onClick={() => handleFavorite(item.id)}
                aria-label={isCheck ? '즐겨찾기 취소' : '즐겨찾기 추가'}
                aria-live="polite"
              >
                <Icon
                  id={isCheck[item.id] ? 'favorite-true' : 'favorite-false'}
                  className="text-primary"
                />
              </Button>
            </div>
            <span className="fs-14 ls lh font-regular text-gray07">
              {item.start_date} &#126; {item.end_date}
            </span>
            <span className="fs-14 ls lh font-regular text-gray07 inline-flex items-center">
              {item.region}
              <Icon id="arrow-small-right" size={16} className="text-gray07" />
              {item.district}
            </span>
            <dl className="fs-14 ls lh font-regular text-gray07 flex items-center gap-2">
              <div className="flex items-center gap-1" aria-label="즐겨찾기 수">
                <dt>
                  <Icon id="favorite-false" size={16} />
                </dt>
                <dd className="align-top">
                  {favoriteCount[item.id] >= 999
                    ? '+999'
                    : favoriteCount[item.id]}
                </dd>
              </div>
              <div className="flex items-center gap-1" aria-label="리뷰 수">
                <dt>
                  <Icon id="review" size={16} />
                </dt>
                <dd>{item.review_count}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;

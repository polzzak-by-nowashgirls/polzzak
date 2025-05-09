import { Link } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import RabbitFace from '@/components/RabbitFace/RabbitFace';

export interface ListItemProps {
  contentid: string;
  firstimage: string;
  title: string;
  eventstartdate: string;
  eventenddate: string;
  region: string;
  district: string;
  likes: number;
  reviews: number;
}

interface ListItemData {
  data: ListItemProps[];
}

function ListItem({ data }: ListItemData) {
  const handleFavorite = (contentId: string) => {
    console.log(`즐겨찾기 저장! ${contentId}`);
  };

  const changeDate = (date: string) => {
    const yy = date.slice(0, 4);
    const mm = date.slice(4, 6);
    const dd = date.slice(6, 8);

    return `${yy}.${mm}.${dd}`;
  };

  return (
    <ul className="flex flex-col gap-6">
      {data.map((item) => (
        <li key={item.contentid}>
          <Link
            to={`/contents/${item.contentid}`}
            className="flex-start relative flex w-full items-center gap-4"
          >
            <div className="bg-primary/10 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl object-cover">
              {item.firstimage === '' ? (
                <RabbitFace alt="이미지 준비 중입니다." />
              ) : (
                <img
                  src={item.firstimage}
                  alt={item.title}
                  className="h-full w-full"
                />
              )}
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
                  className='m-0.5 h-6 w-6 [&_svg:not([class*="size-"])]:size-5'
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavorite(item.contentid);
                  }}
                  // aria-label={isCheck ? '즐겨찾기 취소' : '즐겨찾기 추가'}
                  aria-live="polite"
                >
                  <Icon
                    id={
                      // isCheck[item.contentid] ? 'favorite_on' : 'favorite_off'
                      !item.contentid ? 'favorite_on' : 'favorite_off'
                    }
                    className="text-primary"
                  />
                </Button>
              </div>
              <span className="fs-14 ls lh font-regular text-gray07">
                {changeDate(item.eventstartdate)} &#126;{' '}
                {changeDate(item.eventenddate)}
              </span>
              <span className="fs-14 ls lh font-regular text-gray07 inline-flex items-center">
                {item.region}
                <Icon id="chevron_right" size={16} className="text-gray07" />
                {item.district}
              </span>
              <dl className="fs-14 ls lh font-regular text-gray07 flex items-center gap-2">
                <div
                  className="flex items-center gap-1"
                  aria-label="즐겨찾기 수"
                >
                  <dt>
                    <Icon id="favorite_off" size={16} />
                  </dt>
                  <dd className="align-top">
                    {item.likes >= 999 ? '999+' : item.likes}
                  </dd>
                </div>
                <div className="flex items-center gap-1" aria-label="리뷰 수">
                  <dt>
                    <Icon id="review" size={16} />
                  </dt>
                  <dd>{item.reviews >= 999 ? '999+' : item.reviews}</dd>
                </div>
              </dl>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;

import { Link } from 'react-router-dom';

import { CarouselItem } from '@/components/Carousel/Carousel';
import { ThemeItemList } from '@/mockData/ListItemDummyData';

function ThemeItemListCard({ item }: { item: ThemeItemList }) {
  const { imgUrl, title, region } = item;

  return (
    <CarouselItem className="ml-3 shrink-0 basis-[150px]">
      {/* 상세페이지 생성 후 수정 */}
      <Link to={`/search/상세보기로이동`}>
        <figure>
          <img
            src={imgUrl}
            alt={title}
            className="aspect-[4/3] w-full rounded-md object-cover object-center"
          />
          <figcaption className="mt-2 px-1">
            <p className="fs-14 lh truncate font-medium">{title}</p>
            <p className="fs-13 text-gray06 lh truncate">{region}</p>
          </figcaption>
        </figure>
      </Link>
    </CarouselItem>
  );
}

export default ThemeItemListCard;

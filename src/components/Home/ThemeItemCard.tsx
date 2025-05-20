import { Link } from 'react-router-dom';

import { CarouselItem } from '@/components/Home/Carousel';

export interface ThemeItem {
  contentId: string;
  img: string;
  title: string;
  region: string;
}

function ThemeItemCard({ item }: { item: ThemeItem }) {
  const { contentId, img, title, region } = item;

  return (
    <CarouselItem className="shrink-0 basis-[150px]">
      {/* 상세페이지 생성 후 수정 */}
      <Link to={`/contents/${contentId}`}>
        <figure>
          <img
            src={img}
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

export default ThemeItemCard;

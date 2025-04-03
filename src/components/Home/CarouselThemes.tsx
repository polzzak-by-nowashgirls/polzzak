import { Link } from 'react-router-dom';

import { Carousel, CarouselContent } from '@/components/Home/Carousel';
import ThemeItemCard from '@/components/Home/ThemeItemCard';
import { type ThemeItem } from '@/mockData/ListItemDummyData';

interface ThemeItemProps {
  data: ThemeItem;
}

function CarouselThemes({ data }: ThemeItemProps) {
  return (
    <section>
      <header className="mb-4 flex w-full justify-between px-6">
        <h3 className="fs-16 font-bold">{data.header}</h3>
        {/* 검색 결과 정리 후 링크 연결 */}
        <Link to={'/more'} className="fs-14">
          더보기
        </Link>
      </header>

      <Carousel>
        <CarouselContent className="gap-4 px-6">
          {data.itemList.map((item) => (
            <ThemeItemCard key={item.id} item={item} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default CarouselThemes;

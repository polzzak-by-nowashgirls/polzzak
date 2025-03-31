import { Link } from 'react-router-dom';

import { Carousel, CarouselContent } from '@/components/Carousel/Carousel';
import ThemeItemListCard from '@/components/HomeThemes/ThemeItemListCard';
import { THEMES_ITEM_DUMMY_DATA } from '@/mockData/ListItemDummyData';

function HomeThemes({ data = THEMES_ITEM_DUMMY_DATA[0] }) {
  return (
    <section>
      <header className="mb-4 flex w-full justify-between bg-red-200 px-6">
        <h3 className="fs-16 font-bold">{data.header}</h3>
        {/* 검색 결과 정리 후 링크 연결 */}
        <Link to={'/more'} className="fs-14">
          더보기
        </Link>
      </header>

      <Carousel>
        <CarouselContent className="px-6">
          {data.itemList.map((item) => (
            <ThemeItemListCard key={item.id} item={item} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default HomeThemes;

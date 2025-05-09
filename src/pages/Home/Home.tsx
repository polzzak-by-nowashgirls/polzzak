import Category from '@/components/Category/Category';
import CarouselThemes from '@/components/Home/CarouselThemes';
import CarouselVisual from '@/components/Home/CarouselVisual';
import { THEMES_ITEM_DUMMY_DATA } from '@/mockData/ListItemDummyData';

function Home() {
  return (
    <main className="flex h-full w-full flex-1 flex-col gap-6 overflow-auto pb-8">
      <CarouselVisual />
      <Category />
      <CarouselThemes data={THEMES_ITEM_DUMMY_DATA[0]} />
      <CarouselThemes data={THEMES_ITEM_DUMMY_DATA[1]} />
      <CarouselThemes data={THEMES_ITEM_DUMMY_DATA[2]} />
    </main>
  );
}

export default Home;

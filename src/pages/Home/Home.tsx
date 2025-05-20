import { useEffect, useState } from 'react';

import { useGetDetailCommons } from '@/api/openAPI';
import supabase from '@/api/supabase';
import Category from '@/components/Category/Category';
import CarouselThemes, {
  ThemeItemProps,
} from '@/components/Home/CarouselThemes';
import CarouselVisual from '@/components/Home/CarouselVisual';

// 모든 url 수정 필요!!
const getMonth = () => new Date().getMonth() + 1;

const getThemeTitle = () => {
  const month = getMonth();

  if (month >= 3 && month <= 4) {
    return { title: '벚꽃 하면 바로 이곳', url: 'search/result?q=벚꽃' };
  } else if (month >= 5 && month <= 6) {
    return {
      title: '봄바람 타고 떠나고 싶은 이곳',
      url: `search/result?theme=관광지&date=${month}`,
    };
  } else if (month >= 7 && month <= 8) {
    return {
      title: '무더위를 날려줄 시원한 이곳',
      url: 'search/result?theme=축제',
    };
  } else if (month >= 9 && month <= 11) {
    return {
      title: '단풍 하면 바로 이곳',
      url: `search/result?q=단풍&theme=축제&date=${month}`,
    };
  } else if (month === 12) {
    return {
      title: '연말 감성 충전 스팟',
      url: 'search/result?q=카페&date=12',
    };
  } else {
    return {
      title: '눈 오는 날, 여기 어때?',
      url: `search/result?theme=축제&date=${month}`,
    };
  }
};

const themeRecommendations: ThemeItemProps[] = [
  {
    header: getThemeTitle().title,
    moreUrl: getThemeTitle().url,
    itemList: [],
  },
  {
    header: '이달의 축제',
    moreUrl: `search/result?theme=축제&date=${getMonth}`,
    itemList: [],
  },
  {
    header: '지금 떠오르는 맛집',
    moreUrl: 'search/result?theme=맛집',
    itemList: [],
  },
];

function Home() {
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);

  // 지금 떠오르는 맛집
  useEffect(() => {
    const fetchRestaurantIds = async () => {
      const { data, error } = await supabase
        .from('ex_contents')
        .select('contentid')
        .eq('contenttypeid', '39')
        .order('likes', { ascending: false })
        .limit(7);

      if (error) {
        console.error(error);
        return [];
      }

      return setRestaurantIds(data.map((item) => item.contentid));
    };
    fetchRestaurantIds();
  }, []);

  const famousRestaurant = useGetDetailCommons(restaurantIds);
  themeRecommendations[2].itemList = famousRestaurant;

  return (
    <main className="flex h-full w-full flex-1 flex-col gap-6 overflow-auto pb-8">
      <CarouselVisual />
      <Category />
      {themeRecommendations.map((theme, idx) => (
        <CarouselThemes
          key={idx}
          header={theme.header}
          moreUrl={theme.moreUrl}
          itemList={theme.itemList}
        />
      ))}
    </main>
  );
}

export default Home;

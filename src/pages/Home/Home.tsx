import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  fetchDetailCommons,
  fetchGetFestival,
} from '@/api/openAPI/utils/fetchGetFestival';
import { fetchRandomContent } from '@/api/openAPI/utils/fetchRandomContent';
import supabase from '@/api/supabase';
import Category from '@/components/Category/Category';
import CarouselThemes, {
  ThemeItemProps,
} from '@/components/Home/CarouselThemes';
import CarouselVisual from '@/components/Home/CarouselVisual';
// import { ThemeItem } from '@/components/Home/ThemeItemCard';

// 모든 url 수정 필요!!
const LIMIT = 7;
const getMonth = () => new Date().getMonth() + 1;

const getThemeTitle = () => {
  const month = getMonth();

  if (month >= 3 && month <= 4) {
    return { title: '벚꽃 하면 바로 이곳', url: 'search/result?q=벚꽃' };
  } else if (month >= 5 && month <= 6) {
    return {
      title: '봄바람 타고 떠나고 싶은 이곳',
      url: `search/result?q=???`,
    };
  } else if (month >= 7 && month <= 9) {
    return {
      title: '시원한 바다와 함께하는 여름',
      url: 'search/result?q=바다',
    };
  } else if (month >= 10 && month <= 11) {
    return {
      title: '단풍 하면 바로 이곳',
      url: `search/result?q=단풍`,
    };
  } else if (month === 12) {
    return {
      title: '따듯한 크리스마스를 즐길 이곳',
      url: 'search/result?q=크리스마스',
    };
  } else {
    return {
      title: '흰 눈 사이로 썰매를 타며 즐기기 좋은 이곳',
      url: `search/result?q=겨울????`,
    };
  }
};

const fetchRestaurantIds = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('ex_contents')
    .select('contentid')
    .eq('contenttypeid', '39')
    .order('likes', { ascending: false })
    .limit(LIMIT);

  if (error) throw error;
  return data?.map((item) => item.contentid) ?? [];
};

function Home() {
  const themeTitle = getThemeTitle();
  // searchKeyword 이용한 fetch함수 만들기
  // 키워드 넣어서 뽑아내고 contenttypeid이 12, 14, 15인 콘텐츠 7개 가져오기!

  const { data: festivalOfTheMonth = [], isLoading: isLoadingFestival } =
    useQuery({
      queryKey: ['festival-home'],
      queryFn: () => fetchGetFestival(),
      staleTime: 1000 * 60 * 60,
    });

  const { data: restaurantIds = [], isLoading: isLoadingIds } = useQuery({
    queryKey: ['restaurant-ids'],
    queryFn: fetchRestaurantIds,
    staleTime: 1000 * 60 * 60,
  });

  const { data: restaurantDetails = [], isLoading: isLoadingFetchRestaurant } =
    useQuery({
      queryKey: ['restaurant-detail', restaurantIds],
      queryFn: () => fetchDetailCommons(restaurantIds),
      enabled: restaurantIds.length > 0,
    });

  const shortage = useMemo(
    () => Math.max(LIMIT - (restaurantDetails?.length ?? 0), 0),
    [restaurantDetails],
  );

  const { data: fallbackRestaurants = [] } = useQuery({
    queryKey: ['restaurant-fallback', shortage],
    queryFn: () => fetchRandomContent(shortage, 39),
    enabled: shortage > 0,
  });

  const themeRecommendations: ThemeItemProps[] = [
    {
      header: themeTitle.title,
      moreUrl: themeTitle.url,
      itemList: [],
    },
    {
      header: '이달의 축제',
      moreUrl: `search/result?theme=축제&date=${getMonth()}`,
      itemList: [...festivalOfTheMonth],
    },
    {
      header: '지금 떠오르는 맛집',
      moreUrl: 'search/result?theme=맛집',
      itemList: [...restaurantDetails, ...fallbackRestaurants],
    },
  ];

  return (
    <main className="flex h-full w-full flex-1 flex-col gap-6 overflow-auto pb-8">
      <CarouselVisual />
      <Category />
      {isLoadingIds || isLoadingFetchRestaurant || isLoadingFestival ? (
        <p>Skeleton UI</p>
      ) : (
        themeRecommendations.map((theme, idx) => (
          <CarouselThemes
            key={idx}
            header={theme.header}
            moreUrl={theme.moreUrl}
            itemList={theme.itemList}
          />
        ))
      )}
    </main>
  );
}

export default Home;

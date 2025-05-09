import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetDetailCommon } from '@/api/openAPI';
import Button from '@/components/Button/Button';
import Details from '@/components/Contents/Details';
import Icon from '@/components/Icon/Icon';
import UserMenu, { MenuItemTypes } from '@/components/UserMenu/UserMenu';
import { useHeaderStore } from '@/store/useHeaderStore';

const userMenu: MenuItemTypes[] = [
  {
    label: '즐겨찾기',
    icon: 'favorite_off',
    path: '/',
  },
  {
    label: '폴짝추가',
    icon: 'calendar',
    path: '/',
  },
  {
    label: '리뷰작성',
    icon: 'review',
    path: '/',
  },
  {
    label: '공유하기',
    icon: 'share',
    path: '/',
  },
];

function ViewDetails() {
  const { id } = useParams();
  const data = useGetDetailCommon(id as string);
  const setContentsTitle = useHeaderStore((state) => state.setContentsTitle);
  console.log(data);
  console.log(data.length);

  // 헤더 타이틀 변경
  useEffect(() => {
    if (data.length > 0) {
      setContentsTitle(data[0].title);
    }
    return () => {
      setContentsTitle(null); // 페이지를 벗어날 때 초기화
    };
  }, [data, setContentsTitle]);

  let contentSection;

  if (data.length === 0) {
    contentSection = <div className="text-center">로딩 중...</div>;
  } else if (
    ['39', '32', '14', '28'].includes(data[0].contenttypeid.toString())
  ) {
    contentSection = (
      <Details type="guide" data={data[0]}>
        이용 안내
      </Details>
    );
  } else if (['15', '12'].includes(data[0].contenttypeid)) {
    contentSection = (
      <div className="flex flex-col gap-6">
        <Details type="guide" data={data[0]}>
          이용 안내
        </Details>
        <Details type="detail" data={data[0]}>
          행사 소개
        </Details>
        <Details type="detail" data={data[0]}>
          행사 내용
        </Details>
      </div>
    );
  } else {
    contentSection = null; // 혹은 다른 fallback
  }

  return (
    <>
      {data.length > 0 ? (
        data[0].firstimage ? (
          <img
            src={data[0].firstimage}
            alt={data[0].title}
            className="aspect-video w-full rounded-2xl"
          />
        ) : (
          <img
            src="/images/rabbit_face.png"
            alt="이미지 준비 중입니다."
            className="m-auto aspect-square h-12"
          />
        )
      ) : (
        <div className="text-center">로딩 중...</div>
      )}
      <UserMenu menus={userMenu} />
      {contentSection}
      <Button variant={'float'}>
        <Icon id="arrow_top" />
      </Button>
    </>
  );
}

export default ViewDetails;

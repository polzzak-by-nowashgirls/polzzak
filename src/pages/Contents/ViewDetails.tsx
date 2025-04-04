import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Details from '@/components/Contents/Details';
import Icon from '@/components/Icon/Icon';
import UserMenu, { MenuItemTypes } from '@/components/UserMenu/UserMenu';
import { LIST_ITEM_DUMMY_DATA } from '@/mockData/ListItemDummyData';

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
  const navigate = useNavigate();

  const item = LIST_ITEM_DUMMY_DATA.find((item) => item.id.toString() === id);

  useEffect(() => {
    if (!item) {
      navigate('/not-found');
    }
  }, [item, navigate]);

  return (
    <div className="flex flex-col gap-4">
      {item && (
        <img src={item.imgUrl} alt={item.title} className="rounded-2xl" />
      )}

      <section>
        <UserMenu menus={userMenu} />
      </section>
      <div className="flex flex-col gap-6">
        <Details type="guide">이용 안내</Details>
        <Details type="detail">행사 소개</Details>
        <Details type="detail">행사 내용</Details>
      </div>
      <Button variant={'float'}>
        <Icon id="arrow_top" />
      </Button>
    </div>
  );
}

export default ViewDetails;

import { useNavigate } from 'react-router-dom';

import MenuItem from '@/components/My/MenuItem';
import UserMenu, { MenuItemTypes } from '@/components/UserMenu/UserMenu';

function My() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/login', {
      state: { toastMessage: '로그아웃이 완료되었습니다.' },
    });
  };

  const menus = [
    { label: '공지사항', href: '/notice' },
    { label: '서비스 이용약관', href: '/terms' },
    { label: '로그아웃', onClick: handleLogoutClick },
  ];

  const userMenus: MenuItemTypes[] = [
    {
      label: '즐겨찾기',
      icon: 'favorite_off',
      onClick: () => {
        console.log('클릭');
      },
    },
    {
      label: '폴짝추가',
      icon: 'calendar',
      onClick: () => {
        console.log('클릭');
      },
    },
    {
      label: '리뷰작성',
      icon: 'review',
      path: '/my/review',
    },
    {
      label: '공유하기',
      icon: 'share',
      onClick: () => {
        console.log('공유하기 클릭');
      },
    },
  ];

  return (
    <div>
      <h1>마이페이지</h1>
      <UserMenu menus={userMenus} />
      <MenuItem menus={menus} />
    </div>
  );
}

export default My;

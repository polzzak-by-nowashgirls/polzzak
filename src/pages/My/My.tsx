import Modal from '@/components/Modal/Modal';
import MenuItem from '@/components/My/MenuItem';
import Profile from '@/components/Profile/Profile';
import UserMenu, { MenuItemTypes } from '@/components/UserMenu/UserMenu';
import { USER_INFO } from '@/mockData';
import { useModalStore } from '@/store/useModalStore';

function My() {
  const { openModal } = useModalStore();

  const handleLogoutClick = () => {
    openModal();
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
    <section className="flex flex-col gap-6">
      <h1 className="sr-only">마이페이지</h1>
      <Profile userInfo={USER_INFO} />
      <UserMenu menus={userMenus} />
      <MenuItem menus={menus} />
      <Modal mode="alert" type="logout" />
    </section>
  );
}

export default My;

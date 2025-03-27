import { useNavigate } from 'react-router-dom';

import MenuItem from '@/components/My/MenuItem';

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

  return (
    <div>
      <h1>마이페이지</h1>
      <MenuItem menus={menus} />
    </div>
  );
}

export default My;

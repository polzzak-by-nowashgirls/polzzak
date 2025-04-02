import { Outlet, useLocation } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import MenuItem from '@/components/My/MenuItem';
import { useModalStore } from '@/store/useModalStore';

const menus = [
  { label: '닉네임 설정', href: 'nickname' },
  { label: '비밀번호 설정', href: 'password' },
  { label: '휴대폰 번호 설정', href: 'phone-number' },
  { label: '이메일 설정', href: 'email' },
];

function Edit() {
  const { openModal } = useModalStore();
  const location = useLocation();
  const isEditPage = location.pathname === '/my/edit';

  const handleDeleteButton = () => {
    openModal();
  };

  return (
    <section className="flex h-full w-full flex-col">
      <h1 className="sr-only">내 정보</h1>
      {isEditPage ? (
        <div className="flex h-full w-full flex-col justify-between">
          <MenuItem menus={menus} />
          <Button
            className="bg-gray01 text-gray07 font-regular flex h-[46px] justify-between"
            size="md"
            onClick={handleDeleteButton}
          >
            탈퇴하기
            <Icon id="chevron_right" className="text-gray05" />
          </Button>
          <Modal mode="alert" type="delete" />
        </div>
      ) : (
        <Outlet />
      )}
    </section>
  );
}

export default Edit;

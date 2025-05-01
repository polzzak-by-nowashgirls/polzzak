import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import PolzzakList from '@/components/Polzzak/PolzzakList';
import RequireLogin from '@/pages/RequireLogin';
import { useUserStore } from '@/store/useUserStore';

function Polzzak() {
  const [isExist, setIsExist] = useState(true);
  const location = useLocation();
  const isPolzzakPage = location.pathname === '/polzzak';
  const navigate = useNavigate();
  const handleAddPolzzak = () => {
    navigate('/polzzak/add');
  };
  const { user, fetchUserInfo } = useUserStore();

  useEffect(() => {
    if (!isPolzzakPage) return;

    fetchUserInfo();
  }, [isPolzzakPage, fetchUserInfo]);

  return (
    <main className="flex h-full w-full flex-1 flex-col overflow-auto p-6">
      <h2 className="sr-only">폴짝</h2>
      {isPolzzakPage ? (
        user ? (
          isExist ? (
            <div className="relative flex flex-col gap-4">
              <div>
                <Input
                  type="text"
                  label=""
                  hideLabel={true}
                  placeholder="폴짝 찾기"
                >
                  <Icon id="search" className="text-gray05 cursor-pointer" />
                </Input>
              </div>
              <PolzzakList />
              <Button
                variant={'float'}
                onClick={handleAddPolzzak}
                className="z-99"
                aria-label="폴짝 추가하기"
              >
                <Icon id="add" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h2 className="fs-18 ls lh font-semibold text-black">
                  등록된 폴짝이 없어요!
                </h2>
                <p className="fs-14 font-regular ls lh text-black">
                  {user?.nickname}님만의 폴짝을 추가해 주세요!
                </p>
              </div>
              <Button onClick={handleAddPolzzak}>폴짝 추가하기</Button>
            </div>
          )
        ) : (
          <RequireLogin />
        )
      ) : (
        <Outlet />
      )}
    </main>
  );
}

export default Polzzak;

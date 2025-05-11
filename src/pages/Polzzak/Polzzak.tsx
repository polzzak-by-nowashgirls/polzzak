import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import PolzzakList from '@/components/Polzzak/PolzzakList';
import { useToast } from '@/hooks/useToast';
import RequireLogin from '@/pages/RequireLogin';
import { useAuthStore } from '@/store/useAuthStore';

export type ListItemType = {
  id: string;
  user_id: string;
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  thumbnail: string | null;
  created_at: string;
};

function Polzzak() {
  const [myPolzzak, setMyPolzzak] = useState<ListItemType[]>();
  const location = useLocation();
  const isPolzzakPage = location.pathname === '/polzzak';
  const navigate = useNavigate();
  const showToast = useToast();
  const handleAddPolzzak = () => {
    navigate('/polzzak/add');
  };
  const getUserId = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = getUserId?.id;

  const fetchMyPolzzak = useCallback(async () => {
    const { data, error } = await supabase
      .from('ex_polzzak')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      showToast('잠시 후 다시 시도해 주세요.', 'top-[64px]', 5000);
      console.error('폴짝 데이터 패치 실패 : ', error);
      return;
    }

    setMyPolzzak(data);
  }, [userId, showToast]);

  useEffect(() => {
    if (isPolzzakPage && userId) {
      fetchMyPolzzak();
    }
  }, [isPolzzakPage, userId, fetchMyPolzzak]);

  const handleSearch = () => {
    console.log('폴짝 찾기');
  };

  return (
    <main className="flex h-full w-full flex-1 flex-col overflow-auto p-6">
      <h2 className="sr-only">폴짝</h2>
      {isPolzzakPage ? (
        isAuthenticated ? (
          <div className="relative flex flex-col gap-4">
            <div>
              <Input
                type="text"
                label=""
                hideLabel={true}
                placeholder="폴짝 찾기"
                onChange={(e) => {
                  const value = e.target.value;
                  console.log(value);
                }}
              >
                <Button variant="input" onClick={handleSearch}>
                  <Icon id="search" />
                </Button>
              </Input>
            </div>
            <PolzzakList data={myPolzzak ?? []} refetch={fetchMyPolzzak} />
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
          <RequireLogin />
        )
      ) : isAuthenticated ? (
        <Outlet />
      ) : (
        <RequireLogin />
      )}
    </main>
  );
}

export default Polzzak;

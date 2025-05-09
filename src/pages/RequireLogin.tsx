import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

function RequireLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="fs-18 font-semibold">
        로그인이 필요한 페이지 입니다.
        <p className="fs-14 font-regular mt-1">저희와 함께 폴짝 떠나볼까요?</p>
      </h3>
      <Button onClick={() => navigate('/login')}>
        로그인 • 회원가입
        <Icon id="chevron_right" />
      </Button>
    </div>
  );
}

export default RequireLogin;

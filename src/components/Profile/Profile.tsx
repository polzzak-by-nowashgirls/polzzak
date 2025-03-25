import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';

interface ProfileProps {
  userInfo: {
    nickName: string;
    email: string;
  };
}

function Profile({ userInfo }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-gray01 flex items-center justify-start gap-4 rounded-2xl p-4">
      <div className="flex w-full flex-col gap-1">
        <h3 className="fs-16 ls lh font-semibold text-black">
          <span>{userInfo.nickName}</span>님 안녕하세요!
        </h3>
        <span
          className="fs-14 font-regular text-gray07 ls lh"
          aria-label={`이메일: ${userInfo.email}`}
        >
          {userInfo.email}
        </span>
      </div>
      <Button
        variant="input"
        size="md"
        className="text-gray06 shrink-0"
        onClick={() => navigate('/userInfo')}
      >
        편집
      </Button>
    </section>
  );
}

export default Profile;

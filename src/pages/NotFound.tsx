import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import RabbitFace from '@/components/RabbitFace/RabbitFace';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-primary flex items-center justify-center gap-1 text-center text-[64px] font-semibold whitespace-nowrap">
          <p>4</p>
          <RabbitFace
            src="/images/rabbit_face.png"
            alt="토끼 얼굴"
            className="w-[64px]"
          />
          <p>4</p>
        </h1>
        <p className="fs-16 font-semibold">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>
      <div className="flex w-[calc(100%-8px)] flex-col gap-2">
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전 화면으로 돌아가기
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default NotFound;

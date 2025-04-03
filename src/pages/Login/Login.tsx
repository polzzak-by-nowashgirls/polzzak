import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import RabbitFace from '@/components/RabbitFace/RabbitFace';
import { useToast } from '@/hooks/useToast';

function Login() {
  const location = useLocation();
  const showToast = useToast();

  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage);
    }
  }, [location.state, showToast]);

  return (
    <div className="m-auto flex h-full max-w-[420px] flex-col justify-center gap-8 pb-14">
      <h2>
        <Link
          to="/"
          className="fs-40 text-primary font-title flex items-center justify-center gap-2 py-3 font-bold whitespace-nowrap"
        >
          <RabbitFace src="/images/rabbit_face.png" alt="토끼 얼굴" size={40} />
          폴짝
          <RabbitFace src="/images/rabbit_face.png" alt="토끼 얼굴" size={40} />
        </Link>
      </h2>
      <fieldset className="flex flex-col gap-2">
        <Input
          type="text"
          label="아이디"
          placeholder="아이디"
          hideLabel={true}
        />
        <Input label="비밀번호" placeholder="비밀번호" hideLabel={true}>
          <Button variant="input">
            <Icon id="visibillity_off" />
          </Button>
        </Input>
        <div className="flex items-center justify-between gap-2">
          <Checkbox label="아이디 저장" />
          <Link
            to="#"
            className="fs-14 font-regular text-gray07 h-8 px-1 leading-8"
          >
            아이디/비밀번호 찾기
          </Link>
        </div>
        <Button>로그인</Button>
      </fieldset>
      <div className="flex justify-center gap-1">
        <p className="fs-14 font-regular text-gray07">
          아직 회원이 아니신가요?
        </p>
        <Link to="/register" className="fs-14 text-primary px-1 font-semibold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;

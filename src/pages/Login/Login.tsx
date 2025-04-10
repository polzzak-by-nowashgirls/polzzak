import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import Icon, { IconId } from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import RabbitFace from '@/components/RabbitFace/RabbitFace';
import { useToast } from '@/hooks/useToast';
import { validatePassword } from '@/lib/validatePassword';
import { validateId } from '@/lib/validationId';

function Login() {
  const location = useLocation();
  const showToast = useToast();

  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage);
    }
  }, [location.state, showToast]);

  // 🕹️ 아이디
  const [idValue, setIdValue] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [idValid, setIdValid] = useState<boolean | null>(null);

  const onChangeIDInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdValue(value);

    const { isValid, message } = validateId(value);
    setIdValid(isValid);
    setIdMessage(isValid ? '' : message);

    if (isSavedId) {
      localStorage.setItem('savedId', value);
    }
  };

  // 🕹️ 비밀번호
  const [pwValue, setPwValue] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwValid, setPwValid] = useState<boolean | null>(null);

  const onChangePWInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwValue(value);

    const { isValid, message } = validatePassword(value);
    setPwValid(isValid);

    if (!isValid) {
      setPwMessage(message);
    } else {
      setPwMessage('');
    }
  };

  // 🕹️ 가시성 버튼 클릭
  const [isVisible, setIsVisible] = useState(false);

  const onClickVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const inputType = isVisible ? 'text' : 'password';
  const visibleIconId: IconId = isVisible
    ? 'visibillity_on'
    : 'visibillity_off';

  // 🕹️ 아이디 저장
  const [isSavedId, setIsSavedId] = useState(true);
  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      setIdValue(savedId);
      setIsSavedId(true);
    }
  }, []);
  const onToggleSavedId = () => {
    setIsSavedId((prev) => {
      const next = !prev;

      if (next && idValue) {
        localStorage.setItem('savedId', idValue);
      } else {
        localStorage.removeItem('savedId');
      }
      return next;
    });
  };

  // 🕹️ 아이디/비밀번호 찾기
  const onClickFindAccount = () => {
    console.log('아이디/비밀번호 찾기');
  };

  // 🕹️ 로그인 버튼 클릭
  const onClickLogin = () => {
    console.log('로그인');
  };

  return (
    <main className="m-auto flex h-full w-full max-w-[420px] flex-col justify-center gap-8 px-6 pb-14">
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
        <div>
          <Input
            type="text"
            label="아이디"
            placeholder="아이디"
            hideLabel={true}
            onChange={onChangeIDInput}
          />
          {idValid !== null && (
            <Validation status={idValid} message={idMessage} />
          )}
        </div>
        <div>
          <Input
            type={inputType}
            label="비밀번호"
            placeholder="비밀번호"
            hideLabel={true}
            onChange={onChangePWInput}
          >
            <Button variant="input" onClick={onClickVisible}>
              <Icon id={visibleIconId} />
            </Button>
          </Input>
          {pwValid !== null && (
            <Validation status={pwValid} message={pwMessage} />
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <Checkbox
            label="아이디 저장"
            checked={isSavedId}
            onChange={onToggleSavedId}
          />
          {/* <Link
            to="#"
            className="fs-14 font-regular text-gray07 h-8 px-1 leading-8"
          >
            아이디/비밀번호 찾기
          </Link> */}
          <Button
            variant="tertiary"
            size="md"
            className="text-gray07 fs-14"
            onClick={onClickFindAccount}
          >
            아이디/비밀번호 찾기
          </Button>
        </div>
        <Button onClick={onClickLogin}>로그인</Button>
      </fieldset>
      <div className="flex justify-center gap-1">
        <p className="fs-14 font-regular text-gray07">
          아직 회원이 아니신가요?
        </p>
        <Link to="/register" className="fs-14 text-primary px-1 font-semibold">
          회원가입
        </Link>
      </div>
    </main>
  );
}

export default Login;

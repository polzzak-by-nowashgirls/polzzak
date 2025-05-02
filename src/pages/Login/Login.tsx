import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import AlertDialog from '@/components/Dialog/AlertDialog';
import Icon, { IconId } from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import RabbitFace from '@/components/RabbitFace/RabbitFace';
import { useToast } from '@/hooks/useToast';
import { validatePassword } from '@/lib/validatePassword';
import { validateId } from '@/lib/validationId';
import { useAuthStore } from '@/store/useAuthStore';
import { useDialogStore } from '@/store/useDialogStore';

function Login() {
  const location = useLocation();
  const showToast = useToast();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useDialogStore();

  // 🕹️ 아이디
  const [idValue, setIdValue] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [idValid, setIdValid] = useState<boolean | null>(null);

  // 🕹️ 비밀번호
  const [pwValue, setPwValue] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwValid, setPwValid] = useState<boolean | null>(null);

  // 🕹️ 비밀번호 가시성
  const [isVisible, setIsVisible] = useState(false);
  const inputType = isVisible ? 'text' : 'password';
  const visibleIconId: IconId = isVisible
    ? 'visibillity_on'
    : 'visibillity_off';

  // 🕹️ 아이디 저장
  const [isSavedId, setIsSavedId] = useState(() => {
    const saved = localStorage.getItem('saveId');
    return saved ? JSON.parse(saved) : true;
  });

  const pwInputRef = useRef<HTMLInputElement>(null);

  // 페이지 진입 시 토스트 메시지 출력
  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage);
    }
  }, [location.state, showToast]);

  // 로컬 스토리지 아이디 값 불러오기
  useEffect(() => {
    if (isSavedId) {
      const savedId = localStorage.getItem('user');
      if (savedId) {
        setIdValue(savedId);
        setIdValid(true);
      }
    } else {
      setIdValue('');
      setIdValid(null);
    }
  }, [isSavedId]);

  const onChangeIDInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdValue(value);

    const { isValid, message } = validateId(value);
    setIdValid(isValid);
    setIdMessage(isValid ? '' : message);
  };

  const onIdKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (idValid) {
        pwInputRef.current?.focus();
      }
    }
  };

  const onChangePWInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwValue(value);

    const { isValid, message } = validatePassword(value);
    setPwValid(isValid);
    setPwMessage(isValid ? '' : message);
  };

  const onPWKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (idValid && pwValid) onClickLogin();
    }
  };

  const onClickVisible = () => setIsVisible((prev) => !prev);

  const onChangeSavedIdToggle = () => setIsSavedId((prev: boolean) => !prev);

  // * 🛡️ Supabase Auth 로그인 처리
  const onClickLogin = async () => {
    // 1. user_id → email 매핑
    const { data: userRow, error: findError } = await supabase
      .from('ex_users')
      .select('email')
      .eq('user_id', idValue)
      .single();

    if (findError || !userRow) {
      setIdValid(false);
      openModal();
      return;
    }

    const { setSession, setUser } = useAuthStore.getState();

    // 2. email + password로 supabase.auth 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userRow.email,
      password: pwValue,
    });

    if (error) {
      openModal();
      return;
    }

    if (data.session && data.user) {
      setSession(data.session);
      setUser(data.user);
    }

    // 3. 저장 옵션에 따라 아이디 저장
    if (isSavedId) {
      localStorage.setItem('user', idValue);
      localStorage.setItem('saveId', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.setItem('saveId', 'false');
    }

    navigate('/', { replace: true });
  };

  return (
    <main className="m-auto flex h-full w-full max-w-[420px] flex-col justify-center gap-6 px-6 pb-20">
      <h2>
        <Link
          to="/"
          aria-label="홈으로 이동"
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
            value={idValue}
            placeholder="아이디"
            hideLabel={true}
            onChange={onChangeIDInput}
            onKeyDown={onIdKeyDown}
            aria-label="아이디를 입력해 주세요."
          />
          {idValid !== null && (
            <Validation status={idValid} message={idMessage} />
          )}
        </div>
        <div>
          <Input
            ref={pwInputRef}
            type={inputType}
            label="비밀번호"
            value={pwValue}
            placeholder="비밀번호"
            hideLabel={true}
            onChange={onChangePWInput}
            onKeyDown={onPWKeyDown}
            aria-label="비밀번호를 입력해 주세요."
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
            onCheckedChange={onChangeSavedIdToggle}
          />
        </div>
        <Button onClick={onClickLogin} disabled={!idValid || !pwValid}>
          로그인
        </Button>
      </fieldset>
      <div className="fs-14 font-regular text-gray07 flex items-center justify-center gap-1">
        <Link to="find-id" className="px-1">
          아이디 찾기
        </Link>
        <span aria-hidden={true} className="bg-gray04 h-[11px] w-[1px]"></span>
        <Link to="reset-password" className="px-1">
          비밀번호 재설정
        </Link>
        <span aria-hidden={true} className="bg-gray04 h-[11px] w-[1px]"></span>
        <div className="relative">
          <Link to="/register" className="px-1">
            회원가입
          </Link>
          <span className="heartbeat-ring bg-primary absolute top-8 right-2 rounded-3xl px-3 py-1 whitespace-nowrap text-white">
            우리 같이 폴짝해요!
            <span
              aria-hidden={true}
              className="bg-primary absolute -top-1 right-4 h-2 w-2 rotate-45"
            ></span>
          </span>
        </div>
      </div>
      {isOpen && (
        <AlertDialog
          header="로그인에 실패하였습니다."
          description={['아이디 또는 비밀번호를', '다시 확인해 주세요.']}
          button={[
            {
              text: '확인',
              onClick: () => {
                closeModal();
                setIdValue('');
                setPwValue('');
              },
            },
          ]}
        />
      )}
    </main>
  );
}

export default Login;

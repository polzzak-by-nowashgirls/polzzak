import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import { validatePassword } from '@/lib/validatePassword';

function Step2() {
  const navigate = useNavigate();
  // > 비밀번호
  const [inputPw, setInputPw] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwValid, setPwValid] = useState<boolean | null>(null);
  // > 비립번호 확인
  const [checkInputPw, setCheckInputPw] = useState('');
  const [checkPwMessage, setCheckPwMessage] = useState('');
  const [checkPwValid, setCheckPwValid] = useState<boolean | null>(null);

  function handleInputPw(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputPw(value);

    const { isValid, message } = validatePassword(value);
    setPwValid(isValid);
    setPwMessage(isValid ? '' : message);
  }
  function handleCheckInputPw(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCheckInputPw(value);

    const { isValid, message } = validatePassword(value);
    setCheckPwValid(isValid);
    setCheckPwMessage(isValid ? '' : message);
  }

  async function handleNextButton() {
    const PREV_USER_ID = localStorage.getItem('ex_users');
    if (!PREV_USER_ID) {
      console.error('해당 USER의 ID가 존재하지 않습니다.');
      return;
    }
    // > supabase에서 ex_users의 step1에서 저장되었던 user_id의 row찾기
    const { data: USER_DATA, error: fetchError } = await supabase
      .from('ex_users')
      .select('*')
      .eq('user_id', PREV_USER_ID)
      .single();

    if (!USER_DATA || fetchError) {
      console.error(fetchError, '사용자 정보를 가져오는 데 실패했습니다.');
      return;
    }

    if (USER_DATA.password === null) {
      const { error: UpdateError } = await supabase
        .from('ex_users')
        .update({ password: inputPw })
        .eq('user_id', PREV_USER_ID);

      navigate(`/register/3`);

      if (UpdateError) {
        console.error(UpdateError, '비밀번호를 저장하는 데 실패했습니다.');
      }
    }
  }

  return (
    <>
      <div>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={inputPw}
          onChange={handleInputPw}
        />
        {pwValid !== null && (
          <Validation status={pwValid} message={pwMessage} />
        )}
      </div>
      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          value={checkInputPw}
          onChange={handleCheckInputPw}
        />
        {checkPwValid !== null && (
          <Validation status={checkPwValid} message={checkPwMessage} />
        )}
      </div>
      <Button
        disabled={inputPw.length === 0 || checkInputPw.length === 0}
        onClick={handleNextButton}
      >
        다음
      </Button>
    </>
  );
}

export default Step2;

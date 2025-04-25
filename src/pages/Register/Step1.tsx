import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import { useGetTable } from '@/api/supabase/hooks';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';

interface ItemTypes {
  user_id: string;
}

function Step1() {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    status: false,
    message: '',
  });
  const message = {
    success: '사용 가능한 아이디 입니다.',
    error: '6~20자의 영문, 숫자로 입력하세요. (대소문자 구분 없음)',
    errorGap: '공백은 사용할 수 없습니다.',
    errorDup: '이미 사용된 아이디입니다.',
  };
  const userData = useGetTable<ItemTypes>('ex_users');

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputId(e.target.value);
  }
  function handleIdCheck() {
    const isDuplicate = userData?.tableData?.some(
      (item) => item.user_id === inputId,
    );

    if (isDuplicate) {
      setValidationStatus({ status: false, message: message.errorDup });
    } else {
      setValidationStatus({ status: true, message: message.success });
    }
    if (inputId.length > 20 || inputId.length < 6) {
      setValidationStatus({ status: false, message: message.error });
      return;
    }
    if (inputId.includes(' ')) {
      setValidationStatus({ status: false, message: message.errorGap });
      return;
    }
  }
  async function handleNextButton() {
    if (validationStatus.status) {
      localStorage.setItem('ex_users', inputId);

      await supabase.from('ex_users').upsert({
        user_id: inputId,
      });

      navigate(`/register/2`);
    }
  }

  useEffect(() => {
    const USERS_ID = localStorage.getItem('ex_users');

    const handleUnload = async () => {
      const headerBack = sessionStorage.getItem('registerNavigation');

      if (!headerBack && USERS_ID) {
        await supabase.from('ex_users').delete().eq('user_id', USERS_ID);
        localStorage.removeItem('ex_users');
      }
      sessionStorage.removeItem('registerNavigation');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-end gap-1">
          <div className="flex-1">
            <Input
              label="아이디"
              placeholder="아이디를 입력해 주세요."
              onChange={handleInput}
              value={inputId}
            />
          </div>
          <Button
            variant={'secondary'}
            onClick={() => {
              handleIdCheck();
            }}
          >
            중복확인
          </Button>
        </div>
        <Validation
          status={validationStatus.status}
          message={validationStatus.message}
        />
      </div>
      <Button disabled={inputId.length === 0} onClick={handleNextButton}>
        다음
      </Button>
    </>
  );
}

export default Step1;

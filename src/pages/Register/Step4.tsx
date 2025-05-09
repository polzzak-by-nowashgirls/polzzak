import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '@/api/supabase';
import { useGetTable } from '@/api/supabase/hooks';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import SelectMenu from '@/components/Input/SelectMenu';
import Validation from '@/components/Input/Validation';
import { Label } from '@/components/Label';

interface ItemTypes {
  email: string;
}

function Step4() {
  const navigate = useNavigate();
  const userData = useGetTable<ItemTypes>('ex_users');
  const [inputEmail, setInputEmail] = useState('');
  const [inputDomain, setInputDomain] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    status: false,
    message: '',
  });
  const fullEmail = `${inputEmail}@${inputDomain}`;
  // const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/;

  const message = {
    success: '사용 가능한 이메일 입니다.',
    errorGap: '공백은 사용할 수 없습니다.',
    errorDup: '이미 사용된 이메일입니다.',
  };

  function handleInputEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setInputEmail(e.target.value);
    console.log('inputEmail', inputEmail);
  }
  function handleInputDomain(e: React.ChangeEvent<HTMLInputElement>) {
    setInputDomain(e.target.value);
    console.log('input', inputDomain);
  }
  function handleSelectedEmail(selected: string) {
    if (selected === '직접 입력') {
      setInputDomain('');
    } else {
      setInputDomain(selected);
    }
  }
  function handleCheckButton() {
    const isDuplicate = userData.tableData.some(
      (item) => item.email === fullEmail,
    );

    if (!pattern.test(fullEmail)) {
      setValidationStatus({
        status: false,
        message: '유효하지 않은 이메일 형식입니다.',
      });
      return;
    }
    if (inputEmail.includes(' ')) {
      setValidationStatus({ status: false, message: message.errorGap });
      return;
    }
    if (isDuplicate) {
      setValidationStatus({ status: false, message: message.errorDup });
    } else {
      setValidationStatus({ status: true, message: message.success });
    }
  }
  async function handleNextButton() {
    const PREV_USER_ID = localStorage.getItem('ex_users');
    if (!PREV_USER_ID) {
      console.error('해당 USER의 ID가 존재하지 않습니다.');
      return;
    }
    const { data: USER_DATA, error: fetchError } = await supabase
      .from('ex_users')
      .select('*')
      .eq('user_id', PREV_USER_ID)
      .single();

    if (!USER_DATA || fetchError) {
      console.error(fetchError, '사용자 정보를 가져오는 데 실패했습니다.');
      return;
    }

    if (USER_DATA.email === null) {
      const { error: UpdateError } = await supabase
        .from('ex_users')
        .update({ email: fullEmail })
        .eq('user_id', PREV_USER_ID);

      navigate(`/register/5`);

      if (UpdateError) {
        console.error(UpdateError, '이메일을 저장하는 데 실패했습니다.');
      }
    }
  }

  return (
    <>
      <div>
        <Label>이메일</Label>
        <div className="flex items-center justify-center gap-1">
          <div className="flex-1">
            <Input
              label="이메일 아이디"
              hideLabel={true}
              type="text"
              placeholder="email"
              value={inputEmail}
              onChange={handleInputEmail}
            />
          </div>
          <span className="fs-14 text-gray06">@</span>
          <div className="flex-1">
            <Input
              label="이메일 도메인"
              hideLabel={true}
              type="text"
              placeholder="직접 입력"
              value={inputDomain}
              onChange={handleInputDomain}
            />
          </div>
        </div>
        <Validation
          status={validationStatus.status}
          message={validationStatus.message}
        />
      </div>
      <SelectMenu data={'email'} onSelectedEmail={handleSelectedEmail} />
      {validationStatus.status ? (
        <Button onClick={handleNextButton}>다음</Button>
      ) : (
        <Button onClick={handleCheckButton}>확인</Button>
      )}
    </>
  );
}

export default Step4;

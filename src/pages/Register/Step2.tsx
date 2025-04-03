import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';

function Step2() {
  const navigate = useNavigate();

  const message = {
    success: '사용 가능한 비밀번호입니다.',
    error: '영문과 숫자, 특수문자를 포함하여 8~20자여야 합니다.',
    errorGap: '공백은 사용할 수 없습니다.',
    confirmSuccess: '확인되었습니다.',
    confirmError: '입력하신 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.',
  };

  return (
    <>
      <div>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <Validation status={true} message={message.success} />
      </div>
      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
        />
        <Validation status={false} message={message.confirmError} />
      </div>
      <Button
        onClick={() => {
          navigate('/register/3');
        }}
      >
        다음
      </Button>
    </>
  );
}

export default Step2;

import { Link } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';

function Step1() {
  const message = {
    success: '사용 가능한 아이디 입니다.',
    error: '6~20자의 영문, 숫자로 입력하세요. (대소문자 구분 없음)',
    errorGap: '공백은 사용할 수 없습니다.',
    errorDup: '이미 사용된 아이디입니다.',
  };

  return (
    <>
      <div>
        <Input label="아이디" placeholder="아이디를 입력해 주세요." />
        <Validation status={true} message={message.success} />
      </div>
      <Button>
        <Link to={'/register/2'}>다음</Link>
      </Button>
    </>
  );
}

export default Step1;

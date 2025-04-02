import { useState } from 'react';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

function PhoneNumber() {
  const [auth, setAuth] = useState(false);
  const handleAuth = () => {
    setAuth(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input label="휴대폰 번호" placeholder="000-0000-0000" />
      </div>
      <div className={auth ? 'flex items-end gap-1.5' : 'hidden'}>
        <div>
          <Input label="인증번호 확인" placeholder="000000" />
        </div>
        <Button variant={'secondary'}>재전송</Button>
      </div>
      <Button variant={'default'} onClick={handleAuth}>
        {auth ? '인증하기' : '인증번호 받기'}
      </Button>
    </div>
  );
}

export default PhoneNumber;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import AlertModal from '@/components/Modal/AlertModal';

function Step5() {
  const navigate = useNavigate();
  const [joinModal, setJoinModal] = useState(false);

  const handleMoveLogin = () => {
    setJoinModal(true);
  };

  const message = {
    success: '사용 가능한 닉네임입니다.',
    error: '2~10자로 입력해 주세요.',
    errorDup: '이미 사용된 닉네임입니다.',
  };

  return (
    <>
      <div className="relative">
        <Button
          variant={'tertiary'}
          className="fs-13 text-gray06 absolute -top-[1.5px] left-11"
          size="sm"
        >
          랜덤 생성
          <Icon id="replay" className="text-gray05" />
        </Button>
        <Input label="닉네임" placeholder="닉네임을 입력해 주세요." />
        <Validation status={false} message={message.errorDup} />
      </div>
      <Button onClick={handleMoveLogin}>완료</Button>
      {joinModal && (
        <AlertModal
          type={'register'}
          handleButtonClick={() => {
            navigate('/login');
          }}
        />
      )}
    </>
  );
}

export default Step5;

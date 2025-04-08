import { useState } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import Modal from '@/components/Modal/Modal';

function Step5() {
  // 로그인 완료 후 뒤로가기 막기 기능 필요
  // 회원가입 페이지를 아예 못들어오게 할 것인지?
  // 회원가입 step1 페이지로만 들어가게 할 것인지?
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
        <Input label="닉네임" placeholder="닉네임을 입력해 주세요." />
        <Button
          variant={'tertiary'}
          className="fs-13 text-gray06 absolute top-[5px] left-12 h-5 px-1"
          size="sm"
        >
          랜덤 생성
          <Icon id="replay" className="text-gray05" />
        </Button>
        <Validation status={false} message={message.errorDup} />
      </div>
      <Button onClick={handleMoveLogin}>완료</Button>
      {joinModal && <Modal mode={'alert'} type={'register'} />}
    </>
  );
}

export default Step5;

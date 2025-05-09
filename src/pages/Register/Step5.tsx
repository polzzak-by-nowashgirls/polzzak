import { useState } from 'react';

import { useGetTable } from '@/api/supabase/hooks';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';
import { useRegisterStore } from '@/store/useRegisterStore';

interface ItemTypes {
  nickname: string;
}

function Step5() {
  // 회원가입 페이지를 아예 못들어오게 할 것인지?
  // 회원가입 step1 페이지로만 들어가게 할 것인지?
  const { isOpen, openModal } = useModalStore();
  const { nickname, setNickname } = useRegisterStore();

  const [validationStatus, setValidationStatus] = useState({
    status: false,
    message: '',
  });
  const message = {
    success: '사용 가능한 닉네임입니다.',
    error: '2~10자로 입력해 주세요.',
    errorDup: '이미 사용된 닉네임입니다.',
  };
  const userData = useGetTable<ItemTypes>('ex_users');

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
  }
  function handleNicknameCheck() {
    const isDuplicate = userData?.tableData?.some(
      (item) => item.nickname === nickname,
    );

    if (isDuplicate) {
      setValidationStatus({ status: false, message: message.errorDup });
    } else {
      setValidationStatus({ status: true, message: message.success });
    }
    if (nickname.length < 2 || nickname.length > 10) {
      setValidationStatus({ status: false, message: message.error });
    }
  }
  function handleRandomButton() {
    const firstList = [
      '귀여운',
      '섹시한',
      '심심한',
      '조용한',
      '똑똑한',
      '배고픈',
      '멍청한',
    ];
    const secondList = [
      '오리',
      '토끼',
      '쥐',
      '소',
      '용',
      '뱀',
      '고양이',
      '개',
      '돼지',
      '말',
      '닭',
      '병아리',
    ];
    const first = firstList[Math.floor(Math.random() * firstList.length)];
    const second = secondList[Math.floor(Math.random() * secondList.length)];
    const number = Math.floor(Math.random() * 1000);

    setNickname(`${first}${second}${number}`);
  }

  function handleCompleteButton() {
    openModal('register');
  }

  return (
    <>
      <div className="relative flex flex-col">
        <div className="flex items-end gap-1">
          <div className="flex-1">
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              value={nickname}
              onChange={handleInput}
            />
            <Button
              variant={'tertiary'}
              className="fs-13 text-gray06 absolute top-[5px] left-12 h-5 px-1"
              size="sm"
              onClick={handleRandomButton}
            >
              랜덤 생성
              <Icon id="replay" className="text-gray05" />
            </Button>
          </div>
          <Button
            variant={'secondary'}
            onClick={() => {
              handleNicknameCheck();
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
      <Button
        onClick={handleCompleteButton}
        disabled={validationStatus.status === false}
      >
        완료
      </Button>
      {isOpen && <Modal mode={'alert'} type={'register'} />}
    </>
  );
}

export default Step5;

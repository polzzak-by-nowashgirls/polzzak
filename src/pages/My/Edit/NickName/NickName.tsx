import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetTable } from '@/api/supabase/hooks';
import { updateNickname } from '@/api/supabase/hooks/updateNickname';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import { useToast } from '@/hooks/useToast';
import { useEditStore } from '@/store/useEditStore';

interface ItemTypes {
  nickname: string;
}

function NickName() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { nickname, setNickname } = useEditStore();
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
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleNicknameCheck = () => {
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
  };
  const handleRandomButton = () => {
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
  };
  const handleNicknameSave = async () => {
    const result = await updateNickname(nickname);
    if (result) {
      navigate('/my/edit');
      showToast('닉네임 저장을 성공했습니다.', 'top-[64px]', 3000);
      setNickname('');
    } else {
      showToast('닉네임 저장을 실패했습니다.', 'top-[64px]', 3000);
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex items-end gap-1">
        <div className="flex-1">
          <Input label="닉네임" value={nickname} onChange={handleNickname} />
        </div>
        <Button
          variant={'tertiary'}
          className="s-13 text-gray06 absolute top-[5px] left-12 h-5 px-1"
          size="sm"
          onClick={handleRandomButton}
        >
          랜덤생성
          <Icon id="replay" className="text-gray05" />
        </Button>
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
      <Button
        variant={'default'}
        disabled={validationStatus.message !== message.success}
        onClick={handleNicknameSave}
      >
        저장
      </Button>
    </div>
  );
}

export default NickName;

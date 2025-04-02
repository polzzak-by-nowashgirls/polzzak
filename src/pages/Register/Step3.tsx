import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import AlertModal from '@/components/Modal/AlertModal';
import { useModalStore } from '@/store/useModalStore';

function Step3() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 열고 닫기

  const [confirmBtn, setConfirmBtn] = useState(false); // 인증번호 받았는지?
  const [confirm, setConfirm] = useState(true); // 인증번호 일치? 일단 true로 만들어서 다음 페이지 넘어가도록 함
  const [modalType, setModalType] = useState<
    'certify_success' | 'certify_fail' | null
  >(null); // 모달 타입 지정
  const [modalCallback, setModalCallback] = useState<
    ((text: string) => void) | null
  >(null); // 모달 버튼 기능

  const getAuthNum = () => {
    setConfirmBtn(true);
  };

  const handleConfirm = () => {
    if (confirm) {
      setModalType('certify_success');
      setModalCallback(() => (buttonText: string) => {
        if (buttonText === '다음') {
          navigate('/register/4');
        }
        closeModal();
        setConfirm(false);
      });
    } else {
      setModalType('certify_fail');
      setModalCallback(() => () => {
        closeModal();
        setConfirm(false);
      });
    }

    openModal();
  };

  return (
    <>
      <div>
        <Input
          label="휴대폰 번호"
          inputMode="numeric"
          placeholder="000-0000-0000"
        />
      </div>
      {confirmBtn && (
        <div className="flex items-end">
          <div className="flex-grow">
            <Input
              label="인증번호 확인"
              inputMode="numeric"
              placeholder="인증번호 6자리를 입력해 주세요."
            />
          </div>
          <Button variant={'secondary'}>재전송</Button>
        </div>
      )}
      {confirmBtn ? (
        <Button onClick={handleConfirm}>인증하기</Button>
      ) : (
        <Button onClick={getAuthNum}>인증번호 받기</Button>
      )}

      {modalType && modalCallback && (
        <AlertModal type={modalType} handleButtonClick={modalCallback} />
      )}
    </>
  );
}

export default Step3;

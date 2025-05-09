import { useState } from 'react';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';
import { useRegisterStore } from '@/store/useRegisterStore';

function Step3() {
  const { openModal } = useModalStore();
  // > 휴대폰 번호 입력
  const { phoneNumber, setPhoneNumber } = useRegisterStore();
  // > 인증 번호 입력
  const [inputConfirm, setInputConfirm] = useState('');

  const [confirmBtn, setConfirmBtn] = useState(false); // 인증번호 받았는지?
  const [confirm] = useState(true); // 인증번호 일치? 일단 true로 만들어서 다음 페이지 넘어가도록 함
  // > 모달 타입 지정
  const [modalType, setModalType] = useState<
    'certify_success' | 'certify_fail' | null
  >(null);

  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, '');

    // > 000-0000-0000 형태
    if (value.length <= 3) {
      // value = value;
    } else if (value.length <= 7) {
      // 4~7자리
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length <= 11) {
      // 8자리 이상
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    } else {
      // 11자리 초과 입력 방지
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setPhoneNumber(value);
  }

  function handleConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputConfirm(value);
  }

  const getAuthNum = () => {
    setConfirmBtn(true);
  };

  function handleAuthButton() {
    if (confirm) {
      setModalType('certify_success');
      openModal('certify_success');
    } else {
      setModalType('certify_fail');
      openModal('certify_fail');
    }
  }

  return (
    <>
      <div>
        <Input
          label="휴대폰 번호"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="000-0000-0000"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          maxLength={13}
        />
      </div>
      {confirmBtn && (
        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <Input
              label="인증번호 확인"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="인증번호 6자리를 입력해 주세요."
              maxLength={6}
              value={inputConfirm}
              onChange={handleConfirm}
            />
          </div>
          <Button variant={'secondary'}>재전송</Button>
        </div>
      )}
      {confirmBtn ? (
        <Button disabled={inputConfirm.length !== 6} onClick={handleAuthButton}>
          인증하기
        </Button>
      ) : (
        <Button disabled={phoneNumber.length !== 13} onClick={getAuthNum}>
          인증번호 받기
        </Button>
      )}

      {modalType && <Modal mode="alert" type={modalType} />}
    </>
  );
}

export default Step3;

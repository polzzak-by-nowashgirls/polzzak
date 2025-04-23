import { useNavigate } from 'react-router-dom';

import { updateNickname } from '@/api/supabase/hooks/updateNickname';
import { useUserUpdate } from '@/hooks/register/useUserUpdate';
import { useModalStore } from '@/store/useModalStore';
import { useRegisterStore } from '@/store/useRegisterStore';

export function useModalActions() {
  const navigate = useNavigate();
  const { closeModal } = useModalStore();
  const { phoneNumber, nickname } = useRegisterStore();
  const { userUpdate } = useUserUpdate(phoneNumber);

  const modalActions: Record<string, (inputValue?: string) => void> = {
    취소: () => {
      closeModal();
    },
    '다시 인증하기': () => {
      closeModal();
    },
    다음: () => {
      userUpdate();
      navigate('/register/4');
      closeModal();
    },
    확인: async () => {
      const result = await updateNickname(nickname);
      if (result) {
        navigate('/login', { replace: true });
        localStorage.removeItem('ex_users');
        closeModal();
      } else {
        console.error('닉네임 저장 실패 또는 이미 존재합니다.');
      }
    },

    저장: () => console.log('저장 버튼에 맞는 함수'),
    삭제: () => console.log('삭제 버튼에 맞는 함수'),
    추가: () => console.log('추가 버튼에 맞는 함수'),
    초기화: () => console.log('초기화 버튼에 맞는 함수'),
    변경: () => console.log('변경 버튼에 맞는 함수'),
    로그아웃: () => {
      navigate('/login', {
        state: { toastMessage: '로그아웃이 완료되었습니다.' },
      });
      // > 아이디 저장일 경우, 아닌 경우로 나누어서 수정
      localStorage.clear();
      sessionStorage.clear();
      closeModal();
    },
    탈퇴: () => {
      navigate('/login', {
        state: { toastMessage: '회원 탈퇴가 완료되었습니다.' },
      });
      closeModal();
    },
    '신규 폴짝 추가하기': () =>
      console.log('신규 폴짝 추가하기 버튼에 맞는 함수'),
    '기존 폴짝 추가하기': () =>
      console.log('기존 폴짝 추가하기 버튼에 맞는 함수'),
  };

  const handleButtonClick = (buttonText: string) => {
    const action = modalActions[buttonText];
    if (action) {
      action();
    } else {
      console.warn(`"${buttonText}"에 대한 동작이 정의되지 않았습니다.`);
    }
  };

  return { handleButtonClick };
}

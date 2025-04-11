import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { BookmarkDummyData } from '@/mockData/ScheduleDummyData';
import { useModalStore } from '@/store/useModalStore';

export function useModalActions() {
  const navigate = useNavigate();
  const { closeModal } = useModalStore();
  const ref = useRef(3);

  const modalActions: Record<string, (inputValue?: string) => void> = {
    취소: closeModal,
    '다시 인증하기': closeModal,
    다음: () => {
      navigate('/register/4');
    },
    확인: () => {
      navigate('/login');
      closeModal();
    },
    저장: (inputValue) => {
      if (!inputValue) {
        console.log('저장 버튼에 맞는 함수');
      } else {
        // 임시데이터 추가. DB 연결 필요 + 로더
        const id = 0;
        const handleTitle = BookmarkDummyData.filter(
          (folder) => folder.id === id,
        );
      }

      closeModal();
    },
    삭제: () => console.log('삭제 버튼에 맞는 함수'),
    추가: (inputValue) => {
      if (!inputValue) {
        console.log('추가 버튼에 맞는 함수');
      } else {
        // 임시데이터 추가. DB 연결 필요 + 로더
        BookmarkDummyData.push({
          id: ref.current++,
          name: inputValue,
          storage: [],
        });
      }

      closeModal();
    },
    초기화: () => console.log('초기화 버튼에 맞는 함수'),
    변경: () => console.log('변경 버튼에 맞는 함수'),
    로그아웃: () => {
      navigate('/login', {
        state: { toastMessage: '로그아웃이 완료되었습니다.' },
      });
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

  const handleButtonClick = ({ buttonText, inputValue }: ModalActionParams) => {
    const action = modalActions[buttonText];
    if (action) {
      action(inputValue);
    } else {
      console.warn(`"${buttonText}"에 대한 동작이 정의되지 않았습니다.`);
    }
  };

  return { handleButtonClick };
}

interface ModalActionParams {
  buttonText: string;
  inputValue?: string;
}

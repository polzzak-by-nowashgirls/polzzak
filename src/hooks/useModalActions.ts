import { useModalStore } from '@/store/useModalStore';

export function useModalActions() {
  const { closeModal } = useModalStore();

  const modalActions: Record<string, () => void> = {
    취소: closeModal,
    '다시 인증하기': closeModal,
    다음: () => console.log('다음 버튼에 맞는 함수'),
    확인: () => console.log('확인 버튼에 맞는 함수'),
    저장: () => console.log('저장 버튼에 맞는 함수'),
    삭제: () => console.log('삭제 버튼에 맞는 함수'),
    추가: () => console.log('추가 버튼에 맞는 함수'),
    초기화: () => console.log('초기화 버튼에 맞는 함수'),
    변경: () => console.log('변경 버튼에 맞는 함수'),
    로그아웃: () => console.log('로그아웃 버튼에 맞는 함수'),
    탈퇴: () => console.log('탈퇴 버튼에 맞는 함수'),
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

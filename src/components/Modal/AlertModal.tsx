import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import { useModalStore } from '@/store/useModalStore';

import Icon from '../Icon/Icon';

interface AlertModalProps {
  type: string;
}

const MODAL_DATA = [
  {
    id: 0,
    type: 'certify_fail',
    title: '인증에 실패하였습니다.',
    content: ['인증번호를 확인해 주세요.'],
    nextBtn: '다시 인증하기',
  },
  {
    id: 1,
    type: 'certify_success',
    title: '인증에 성공하였습니다.',
    content: ['다음을 눌러 진행해 주세요.'],
    prevBtn: '취소',
    nextBtn: '다음',
  },
  {
    id: 2,
    type: 'register',
    title: '회원가입이 완료되었습니다.',
    content: ['홀딱벗은래빗님, 환영합니다 🎉', '로그인 화면으로 이동합니다.'],
    nextBtn: '확인',
  },
  {
    id: 3,
    type: 'logout',
    title: '로그아웃 하시겠습니까?',
    content: ['로그인 페이지로 돌아갑니다.'],
    prevBtn: '취소',
    nextBtn: '확인',
    url: '/',
  },
  {
    id: 4,
    type: 'delete',
    title: '정말 탈퇴하시겠습니까?',
    content: ['탈퇴 버튼 선택 시', '계정은 삭제되며 복구되지 않습니다.'],
    prevBtn: '취소',
    nextBtn: '탈퇴',
    url: '/',
  },
  {
    id: 5,
    type: 'polzzak_add',
    title: '폴짝 추가하기',
    content: ['신규 또는 기존 폴짝을', '선택해 주세요.'],
    prevBtn: '신규 폴짝 추가하기',
    nextBtn: '기존 폴짝 추가하기',
  },
];

function AlertModal({ type }: AlertModalProps) {
  const { isOpen, closeModal } = useModalStore();
  const navigate = useNavigate();
  const modalContent = MODAL_DATA.find((item) => item.type === type);
  if (!modalContent) return null;
  if (!isOpen) return null;

  const handleNextClick = () => {
    switch (type) {
      case 'logout':
        navigate(modalContent.url || '/');
        break;
      case 'register':
        navigate(modalContent.url || '/');
        break;
      case 'certify_success':
        console.log('인증 성공, 회원가입 다음 페이지로 이동');
        break;
      case 'certify_fail':
        console.log('인증 실패');
        closeModal();
        break;
      case 'polzzak_add':
        console.log('폴짝 추가 로직 실행');
        break;
      default:
        closeModal();
    }
  };

  return (
    <dialog className="absolute top-1/2 left-1/2 flex w-full max-w-[17.3125rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-2xl bg-white p-6">
      <div className="m-auto flex flex-col text-center">
        <h1 className="fs-18 lh ls mb-4 font-semibold text-black">
          {modalContent.title}
        </h1>
        {modalContent.content.map((i) => (
          <p className="fs-14 ls lh font-regular text-gray07">
            <span>{i}</span>
          </p>
        ))}
      </div>
      <div
        className={`mt-6 flex w-full items-center justify-center ${
          type === 'polzzak_add' ? 'flex-col' : 'flex-row'
        }`}
      >
        {modalContent.prevBtn && (
          <Button
            className={type === 'polzzak_add' ? 'w-full' : 'w-1/2'}
            variant="secondary"
          >
            {modalContent.prevBtn}
          </Button>
        )}
        <Button
          className={
            modalContent.prevBtn
              ? type === 'polzzak_add'
                ? 'w-full'
                : 'w-1/2'
              : 'w-full'
          }
          variant={type === 'polzzak_add' ? 'secondary' : 'default'}
          onClick={handleNextClick}
        >
          {modalContent.nextBtn}
        </Button>
      </div>
      <div className="order-first mb-1 flex flex-col items-end">
        <Button
          size="sm"
          variant={'tertiary'}
          aria-label="모달 닫기"
          onClick={closeModal}
        >
          <Icon id="close" />
        </Button>
      </div>
    </dialog>
  );
}

export default AlertModal;

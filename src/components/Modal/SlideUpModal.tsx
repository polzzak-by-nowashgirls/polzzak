import { motion } from 'framer-motion';

import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { Radio } from '@/components/Input/RadioGroup';
import { Textarea } from '@/components/Input/Textarea';
import ListItem from '@/components/ListItem/ListItem';
import {
  BookmarkDummyData,
  ScheduleDummyData,
} from '@/mockData/ScheduleDummyData';
import { useModalStore } from '@/store/useModalStore';

interface SlideUpModal {
  type: string;
  handleButtonClick: (buttonText: string) => void;
}

const MODAL_DATA = [
  {
    id: 0,
    title: '즐겨찾기 추가하기',
    type: 'favorite_add',
    prevBtn: '취소',
    nextBtn: '추가',
    content: <Radio data={BookmarkDummyData} />,
  },
  {
    id: 1,
    title: '날짜 선택',
    type: 'calendar',
    content: <Calendar />,
    prevBtn: '초기화',
    nextBtn: '2025.03.17(월) ~ 2025.03.19(수)',
  },
  {
    id: 2,
    title: '폴더 추가하기',
    type: 'folder_add',
    content: (
      <Input
        label="폴더 추가하기"
        hideLabel={true}
        placeholder="폴더 이름을 입력해 주세요"
      />
    ),
    prevBtn: '취소',
    nextBtn: '추가',
  },
  {
    id: 3,
    title: '폴더 이름 편집하기',
    type: 'folder_edit',
    content: (
      <Input
        label="폴더 이름 편집하기"
        hideLabel={true}
        placeholder="기본 폴더"
      />
    ),
    prevBtn: '취소',
    nextBtn: '저장',
  },
  {
    id: 4,
    title: '폴더 삭제하기',
    type: 'folder_delete',
    text: ['폴더 내 모든 콘텐츠도 함께 삭제됩니다.', '정말 삭제하시겠습니까?'],
    prevBtn: '취소',
    nextBtn: '삭제',
  },
  {
    id: 5,
    title: '폴짝 추가하기',
    type: 'polzzak_add-new',
    content: (
      <div className="flex flex-col gap-2">
        <Input label="폴짝 이름" placeholder="폴짝 이름을 입력해 주세요." />
        <Input label="폴짝 날짜" placeholder="날짜를 선택해 주세요.">
          <Button size="sm" variant={'tertiary'}>
            <Icon id="calendar" />
          </Button>
        </Input>
        <Input label="폴짝 장소" placeholder="장소를 입력해 주세요." />
      </div>
    ),
    prevBtn: '취소',
    nextBtn: '추가',
  },
  {
    id: 6,
    title: '폴짝 추가하기',
    type: 'polzzak_add-exist',
    content: <Radio data={ScheduleDummyData} />,
    prevBtn: '취소',
    nextBtn: '추가',
  },
  {
    id: 7,
    title: '폴짝 한 걸음 편집하기',
    type: 'polzzak_edit',
    content: (
      <div className="flex flex-col gap-2">
        <Input label="장소" placeholder="장소를 입력해 주세요.">
          <Button size="sm" variant={'tertiary'}>
            <Icon id="map" />
          </Button>
        </Input>
        <Input label="시간" placeholder="시간를 입력해 주세요.">
          <Button size="sm" variant={'tertiary'}>
            <Icon id="time" />
          </Button>
        </Input>
        <Textarea label="메모" placeholder="메모를 입력해 주세요." />
      </div>
    ),
    prevBtn: '취소',
    nextBtn: '저장',
  },
  {
    id: 8,
    title: '즐겨찾기',
    type: 'favorite_list',
    content: <ListItem />,
  },
  {
    id: 9,
    title: '마라탕 검색 결과',
    type: 'search_list',
    content: '',
  },
  {
    id: 10,
    title: '천유향 마라샹궈',
    type: 'select',
    text: ['제주특별자치도 서귀포시 표선면 번영로 2350-104 보롬왓'],
    prevBtn: '취소',
    nextBtn: '변경',
  },
];

function SlideUpModal({ type, handleButtonClick }: SlideUpModal) {
  const { closeModal, setButtonText } = useModalStore();
  const modalContent = MODAL_DATA.find((item) => item.type === type);
  if (!modalContent) return null;

  return (
    <motion.dialog
      initial={{ y: '20%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '20%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-1/2 z-[100] flex w-screen -translate-x-1/2 transform flex-col gap-4 rounded-t-2xl bg-white px-8 py-6"
    >
      <div
        className={`${
          ['favorite_list', 'search_list', 'select'].includes(modalContent.type)
            ? 'absolute top-0 left-1/2 -translate-x-1/2 transform cursor-grab items-center justify-center overflow-scroll'
            : 'hidden'
        }`}
      >
        <Icon id="drag_handle" />
      </div>
      <header className="flex items-center justify-between">
        <h1 className="fs-18 ls lh font-semibold text-black">
          {modalContent.title}
        </h1>
        <Button
          size="md"
          variant={'tertiary'}
          aria-label="모달 닫기"
          onClick={closeModal}
        >
          <Icon id="close" />
        </Button>
      </header>
      <div>
        {modalContent.content
          ? modalContent.content
          : modalContent.text &&
            modalContent.text.map((i, index) => (
              <p
                className="fs-14 ls lh font-regular text-gray07 text-center"
                key={index}
              >
                <span>{i}</span>
              </p>
            ))}
      </div>
      <div
        className={`flex w-full items-center justify-center ${type === 'calendar' ? 'flex-col' : 'flex-row'}`}
      >
        {modalContent.prevBtn && (
          <Button
            className={`${type === 'calendar' ? 'w-full' : 'w-1/2'}`}
            variant={'secondary'}
            onClick={() => {
              setButtonText(modalContent.prevBtn);
              handleButtonClick(modalContent.prevBtn);
            }}
          >
            {modalContent.prevBtn}
          </Button>
        )}
        {modalContent.nextBtn && (
          <Button
            className={`${type === 'calendar' ? 'order-first w-full' : 'w-1/2'}`}
            onClick={() => handleButtonClick(modalContent.nextBtn)}
          >
            {modalContent.nextBtn}
          </Button>
        )}
      </div>
    </motion.dialog>
  );
}

export default SlideUpModal;

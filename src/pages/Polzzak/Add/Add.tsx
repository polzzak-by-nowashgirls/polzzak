import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

function Add() {
  const { openModal } = useModalStore();

  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="sr-only">폴짝 추가하기</h1>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Input
            label="폴짝 이름"
            type="text"
            placeholder="폴짝 이름을 입력해 주세요."
          />
        </div>
        <div>
          <Input
            label="폴짝 날짜"
            type="text"
            placeholder="폴짝 타이밍을 입력해 주세요."
          >
            <Button variant={'tertiary'} size="md" onClick={openModal}>
              <Icon id="calendar" className="text-gray05" />
            </Button>
          </Input>
          <Validation status={false} message="필수 입력 항목입니다." />
        </div>
        <div>
          <Chip mode="region" />
        </div>
        <div>
          <Input
            label="폴짝 사진"
            type="file"
            placeholder="폴짝 사진을 등록해 주세요."
          >
            <Button variant={'tertiary'} size="md">
              <Icon id="image" className="text-gray05" />
            </Button>
          </Input>
        </div>
      </div>
      <Button>폴짝 추가하기</Button>
      <Modal mode="slide" type="calendar" />
    </section>
  );
}

export default Add;

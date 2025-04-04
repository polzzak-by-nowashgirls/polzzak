import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

function Search() {
  const { openModal } = useModalStore();

  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="sr-only">검색</h1>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Input
            label="검색"
            hideLabel={true}
            type="text"
            placeholder="검색어를 입력해 주세요."
          >
            <Button variant={'tertiary'} size="md">
              <Icon id="search" className="text-gray05" />
            </Button>
          </Input>
        </div>
        <div>
          <Input
            label="폴짝 날짜"
            hideLabel={true}
            type="text"
            placeholder="날짜를 선택해 주세요."
          >
            <Button variant={'tertiary'} size="md" onClick={openModal}>
              <Icon id="calendar" className="text-gray05" />
            </Button>
          </Input>
        </div>
        <Chip mode="region" />
        <Chip mode="theme" type="multiple" />
      </div>
      <Button>검색</Button>
      <Modal mode="slide" type="calendar" />
    </section>
  );
}

export default Search;

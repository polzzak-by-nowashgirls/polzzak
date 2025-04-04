import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Validation from '@/components/Input/Validation';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

function Edit() {
  const location = useLocation();
  const { item } = location.state;
  const { openModal } = useModalStore();
  const [titleValue, setTitleValue] = useState(item?.label);
  const [dateValue, setDateValue] = useState<[string, string] | string>([
    item?.startDate,
    item?.endDate,
  ]);

  const handleTitleValue = () => {
    setTitleValue(item?.label);
  };
  const handleDateValue = () => {
    setDateValue([item?.startDate, item?.endDate]);
  };

  return (
    <section className="flex h-full w-full flex-col justify-between">
      <h1 className="sr-only">폴짝 편집하기</h1>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Input
            label="폴짝 이름"
            type="text"
            placeholder="폴짝 이름을 입력해 주세요."
            onChange={handleTitleValue}
            value={titleValue}
          />
        </div>
        <div>
          <Input
            label="폴짝 날짜"
            type="text"
            placeholder="폴짝 타이밍을 입력해 주세요."
            value={
              !item?.startDate && !item?.endDate
                ? '날짜 미정'
                : !item?.endDate
                  ? `${dateValue[0]}`
                  : `${dateValue[0]} ~ ${dateValue[1]}`
            }
            onChange={handleDateValue}
          >
            <Button variant={'tertiary'} size="md" onClick={openModal}>
              <Icon id="calendar" className="text-gray05" />
            </Button>
          </Input>
          {!item && (
            <Validation status={false} message="필수 입력 항목입니다." />
          )}
        </div>
        <Chip mode="region" type="multiple" selectedRegions={item?.city} />
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
      <Button>폴짝 저장하기</Button>
      <Modal mode="slide" type="calendar" />
    </section>
  );
}

export default Edit;

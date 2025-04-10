import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import { useModalStore } from '@/store/useModalStore';

function MapHeader() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();

  function handleMapFilter(name?: string) {
    if (name === '즐겨찾기') {
      navigate(`/map/favorite`);
    }
    openModal('favorite');
  }
  return (
    <header className="fixed top-0 z-100 mb-4 flex w-full flex-col gap-3 px-4 pt-6">
      <Input
        label="검색"
        hideLabel={true}
        placeholder="검색어를 입력해 주세요."
        className="bg-white"
      >
        <Button variant={'tertiary'} size="md" className="text-gray05">
          <Icon id="search" />
        </Button>
      </Input>
      <Chip mode="map_filter" hideLabel={true} onClick={handleMapFilter} />
      <div className="absolute top-full right-4">
        <Button variant={'secondary'} size="md" className="h-11 w-11">
          <Icon id="location" />
        </Button>
      </div>
    </header>
  );
}

export default MapHeader;

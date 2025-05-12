import { useNavigate } from 'react-router-dom';

import { fetchSearchList } from '@/api/openAPI/utils/fetchSearchList';
import Button from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import { ClickedChipItem } from '@/components/Chip/Chip';
import Icon from '@/components/Icon/Icon';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';
import { useSearchStore } from '@/store/useSearchStore';

function Search() {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const {
    keyword,
    setKeyWord,
    region,
    setRegion,
    theme,
    setTheme,
    setSearchResults,
  } = useSearchStore();

  const openCalendar = () => {
    openModal('calendar');
  };

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };

  const handleRegion = (clickedChip: ClickedChipItem) => {
    if (clickedChip.selected) {
      setRegion(clickedChip.name);
    } else {
      setRegion('');
    }
  };

  const handleTheme = (clickedChip: ClickedChipItem) => {
    setTheme((prev) => {
      if (clickedChip.selected) {
        return [...prev, clickedChip.name];
      } else {
        return prev.filter((item) => item !== clickedChip.name);
      }
    });
  };

  const handleSearchButton = async () => {
    if (!keyword && !region && theme.length === 0) return;

    try {
      const searchResults = await fetchSearchList({ keyword, region, theme });

      setSearchResults(searchResults);

      const params = new URLSearchParams();
      if (keyword) params.set('q', keyword);
      if (region) params.set('region', region);
      if (theme.length > 0) {
        params.set('theme', theme.join(','));
      }
      navigate(`/search/result?${params.toString()}`);

      setKeyWord('');
      setRegion('');
      setTheme([]);
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const openCalendar = () => {
    openModal('calendar');
  };

  return (
    <main className="flex h-full w-full flex-1 flex-col overflow-auto p-6">
      <h1 className="sr-only">검색</h1>
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Input
            label="검색"
            hideLabel={true}
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={keyword}
            onChange={handleKeyword}
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
            type="button"
            value={'날짜를 선택해 주세요.'}
            onClick={openCalendar}
          >
            <Button variant={'tertiary'} size="md" onClick={openCalendar}>
              <Icon id="calendar" className="text-gray05" />
            </Button>
          </Input>
        </div>
        <Chip
          mode="region"
          label="지역 선택"
          subLabel="단일 선택"
          onClick={handleRegion}
        />
        <Chip
          mode="theme"
          type="multiple"
          label="주제 선택"
          subLabel="다중 선택"
          onClick={handleTheme}
        />
      </div>
      <Button
        disabled={!keyword && !region && theme.length === 0}
        onClick={handleSearchButton}
      >
        검색
      </Button>
      <Modal mode="slide" type="calendar" />
    </main>
  );
}

export default Search;

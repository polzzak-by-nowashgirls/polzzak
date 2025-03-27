import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface HeaderProps {
  title: string;
  subTitle?: string;
  editHide?: boolean;
  iconId?: string;
}

function Header({ title, subTitle, editHide = false, iconId }: HeaderProps) {
  const [editText, setEditText] = useState('편집');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleEditText = () => {
    setEditText((prev) => (prev === '편집' ? '완료' : '편집'));
  };

  return (
    <header
      className={`flex h-12 items-center justify-start ${isHome ? 'px-4' : 'px-2'}`}
    >
      <div className="flex flex-1 items-center justify-start gap-2">
        <h1 className="fs-16 ls lh font-semibold text-black">{title}</h1>
        {subTitle && (
          <span className="fs-14 font-regular text-gray07 ls lh">
            {subTitle}
          </span>
        )}
      </div>
      {!isHome && (
        <Button
          type="button"
          variant={'tertiary'}
          className={isHome ? 'hidden' : 'order-first'}
          size="md"
          aria-label="이전 페이지로 이동"
          onClick={() => navigate(-1)}
        >
          <Icon id="arrow-small-left" />
        </Button>
      )}
      {editHide === false ? (
        <Button
          type="button"
          onClick={handleEditText}
          variant="tertiary"
          aria-label={`${editText} 모드로 전환`}
        >
          {editText}
        </Button>
      ) : iconId ? (
        <Button
          type="button"
          variant="tertiary"
          size="md"
          aria-label={`${iconId} 버튼`}
          onClick={() => navigate(`/search`)}
        >
          <Icon id={iconId} />
        </Button>
      ) : null}
    </header>
  );
}

export default Header;
